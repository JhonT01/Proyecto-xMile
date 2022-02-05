"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


import os
from sqlalchemy.orm import sessionmaker
from flask import Flask, request, jsonify, url_for, send_from_directory, flash, redirect
from werkzeug.utils import secure_filename
import xml.etree.ElementTree as ET
import re
import csv
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.doc_elec import doc_elec
from api.utils import APIException, generate_sitemap
from api.models import db, User, Factura, Client, Factura_detalle
from api.routes import api
from api.admin import setup_admin
#from models import Person

UPLOAD_FOLDER = './src/uploads'
ALLOWED_EXTENSIONS = {"xml", "XML"}


ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/subir', methods=['POST'])
def upload_file():

    client_id = 2
    string = str(r'/workspace/Proyecto-xMile/src/uploads')

    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({"Msj": "No file"})
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return jsonify({"Msj": "No selected file"})
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            #If the file extension is valid, parse the xml file for addittional tests
            xml = string + "/" + filename
            parser = ET.XMLParser(encoding="utf-8")
            persed = ET.parse(xml, parser=parser)
            factura = persed.getroot()
            str_factura = str(factura)

            #If the file extension is valid, test if it's an electronic invoice
            #by accessing the file 
            str_factura = str(factura)

            #Validates if the invoice is the current version, otherwise exits loop.

            documento_re = re.findall('v4.3/(.*?)}', str_factura)
            try:
                documento_re = documento_re[0]
            except:
                print('FACTURA NO ES VERSIÓN 4.3')
                return jsonify({"Msj": "Factura no es versión 4.3."})

            print(documento_re)

            #Validates if the xml file is an electronic ivoice, otherwise exits loop.
            if documento_re == "facturaElectronica" or documento_re == "tiqueteElectronico" or documento_re == "facturaElectronicaExportacion" or documento_re == "notaDebitoElectronica":
                
                doc_elec(client_id,xml,filename,factura,documento_re)

            else:
                print(filename, 'no es un combrobante electrónico.')
                return jsonify({"Msj": "No es un documento electrónico valido"})

            
            return jsonify({"Msj": "Archivo subido correctamente"})
            

@app.route('/descargar', methods=['GET'])
def descarga():
    string = str(r'/workspace/Proyecto-xMile/src/outputs')
    out = string + "/facturas.csv"
    #for c, i in db.session.query(Factura, Factura_detalle).filter(Factura.id == Factura_detalle.factura_id).all(): print ("Factura: {} Emisor: {} Detalle: {} Monto: {}".format(c.num_fac,c.emisor, i.detalle, i.mon_total))
    #q = db.session.query(Client).all()
    q = db.session.query(Client, Factura, Factura_detalle).filter(Client.id == Factura.client_id).filter(Factura.id == Factura_detalle.factura_id).filter(Client.id==1).all()
    
    # for row in q:
    #     clienteX = row[2].serialize()
    #     print(clienteX['detalle'])

    # return jsonify({"Msj": "Query Exitoso"})
    
    with open(out, 'w', newline='') as csvFile:
        csvwriter = csv.writer(csvFile, delimiter = ',')
        csvwriter.writerow(["ID Cliente", "Numero de Factura", "Fecha", "Linea Factura", "Detalle", "Monto Total"])
        for row in q:
            regClient = row[0].serialize()  
            regFactura = row[1].serialize()
            regDetalle = row[2].serialize()
            csvwriter.writerow([regFactura['num_fac']])

            #csvwriter.writerow([q.factura.client_id, q.factura.num_fac, q.facturafecha, q.factura_detalle.lin_fac, q.factura_detalle.detalle, q.factura_detalle.mon_total])
    #return send_file(out,mimetype='text/csv',attachment_filename='prueba.csv',as_attachment=True)
    return jsonify({"Msj": "Query Exitoso"})

   


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
