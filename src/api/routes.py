"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Client
from api.utils import generate_sitemap, APIException
#from flask_jwt_extended import create_access_token
#from flask_jwt_extended import get_jwt_identity
#from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


    






@api.route('/client', methods=['POST'])
def crearCliente():
    body=request.get_json()
    cliente = Client.query.filter_by(fiscal_id = body["cedulajuridica"]).first()
    if not cliente:
        newclient = Client(fiscal_id = body["cedulajuridica"], razon_social=body["razonsocial"])
        db.session.add(newclient)
        db.session.commit()
    else:
        return jsonify("Cliente existente. Registre nuevo cliente")    
    return jsonify("recibido")