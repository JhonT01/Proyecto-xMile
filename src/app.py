"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""


import os
from flask import Flask, request, jsonify, url_for, send_from_directory, flash, redirect
from werkzeug.utils import secure_filename
import xml.etree.ElementTree as ET

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
ALLOWED_EXTENSIONS = {"xml"}


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

    client_id = 1
    string = str(r'/workspace/Proyecto-xMile/src/uploads')
    documento_re = 'facturaElectronica'

    
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

            xml = string + "/" + filename
            parser = ET.XMLParser(encoding="utf-8")
            persed = ET.parse(xml, parser=parser)
            factura = persed.getroot()

            doc_elec(client_id,xml,filename,factura,documento_re)


            return jsonify({"Msj": "Archivo subido correctamente"})
            

@app.route('/procesar', methods=['GET'])
def procesamiento():

    client_id = 1
    
    string = str(r'/workspace/Proyecto-xMile/src/uploads')
    filename = 'FE-50628112100080114027200100001010000000096101113749.xml'
    xml = string + "/" + filename
    
    parser = ET.XMLParser(encoding="utf-8")
    persed = ET.parse(xml, parser=parser)

    factura = persed.getroot()
    
    print(factura)

    documento_re = 'facturaElectronica'

    doc_elec(client_id,xml,filename,factura,documento_re)

    return jsonify({'msj':'AYY'})


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
