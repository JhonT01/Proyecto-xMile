"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


import os
from sqlalchemy.orm import sessionmaker
from flask import Flask, request, jsonify, url_for, send_from_directory, flash, redirect, send_file
from werkzeug.utils import secure_filename
import xml.etree.ElementTree as ET
import re
import csv
import time
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
            
            client_id = request.form['client_id']
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

            time.sleep(2)
            return jsonify({"Msj": "Archivo subido correctamente"})
            

@app.route('/descargar', methods=['POST'])
def descarga():

    if request.method == 'POST':

        frontClient = request.form['client_id']
        string = str(r'/workspace/Proyecto-xMile/src/outputs')
        out = string + "/facturas.csv"

        q = db.session.query(Client, Factura, Factura_detalle).filter(Client.id == Factura.client_id).filter(Factura.id == Factura_detalle.factura_id).filter(Client.id==frontClient).all()

        with open(out, 'w', newline='') as csvFile:

            #Extraccion de los nombres de todas las columnas
            csvHeaders = []
            csvwriter = csv.writer(csvFile, delimiter = ',')
            clientCols = Client.query.all()
            clientCols = clientCols[0].serialize()
            clientCols = clientCols.keys()
            
            for k in clientCols:
                csvHeaders.append(k)

            facturaCols = Factura.query.all()
            facturaCols = facturaCols[0].serialize()
            facturaCols = facturaCols.keys()
            
            for k in facturaCols:
                csvHeaders.append(k)

            detalleCols = Factura_detalle.query.all()
            detalleCols = detalleCols[0].serialize()
            detalleCols = detalleCols.keys()
            
            for k in detalleCols:
                csvHeaders.append(k)

            print(csvHeaders)

            #Insercion de todos los registros
            csvwriter.writerow(csvHeaders)
            for row in q:
                regClient = row[0].serialize()  
                regFactura = row[1].serialize()
                regDetalle = row[2].serialize()
                csvwriter.writerow(
                    #Registros Cliente
                    [regClient['id'],
                    regClient['fiscal_id'],
                    regClient['razon_social'],
                    #Registros Factura
                    regFactura['id'],
                    regFactura['cliente_id'],
                    regFactura['doc'],
                    regFactura['num_fac'],
                    regFactura['fecha'],
                    regFactura['emisor'],
                    regFactura['emisor_id'],
                    regFactura['receptor'],
                    regFactura['receptor_id'],
                    regFactura['moneda'],
                    regFactura['actividad'],
                    #Registros Detalle
                    regDetalle['id'],
                    regDetalle['factura_id'],
                    regDetalle['lin_fac'],
                    regDetalle['codigo'],
                    regDetalle['detalle'],
                    regDetalle['tarifa'],
                    regDetalle['precio_unit'],
                    regDetalle['cantidad'],
                    regDetalle['unidad'],
                    regDetalle['gravado_isc'],
                    regDetalle['exento_isc'],
                    regDetalle['imp_especif'],
                    regDetalle['monto_linea'],
                    regDetalle['gravado'],
                    regDetalle['exento'],
                    regDetalle['exonerado'],
                    regDetalle['si_otro'],
                    regDetalle['descuento'],
                    regDetalle['subtotal'],
                    regDetalle['monto_isc'],
                    regDetalle['impuesto'],
                    regDetalle['mon_total'],
                    regDetalle['auto_exon'],
                    regDetalle['fecha_exon'],
                    ])
                
            return send_file(out,mimetype='text/csv',attachment_filename='reporteFacturas.csv',as_attachment=True)

@app.route('/clients', methods=['GET'])
def get_clients():
    response = []
    q = db.session.query(Client).all()
    for row in q:
        cliente = row.serialize()
        response.append(cliente)

    print(response)    
    return jsonify(response),200

@app.route('/facturas', methods=['GET'])
def get_facturas():
    response = []
    q = db.session.query(Factura).all()
    for row in q:
        factura = row.serialize()
        response.append(factura)

    print('Query exitoso')    
    return jsonify(response),200
   
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
