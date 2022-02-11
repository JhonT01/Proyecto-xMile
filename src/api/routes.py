"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

# from flask.ext.bcrypt import Bcrypt

from datetime import date

api = Blueprint('api', __name__)
# bcrypt = Bcrypt(app)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/registro', methods=['POST'])
def crearUser():
    # nombre= request.json['nombre']
    # apellido = request.json['apellido']
    # email = request.json['email']
    # contaseña = request.json['password']
    rol = "empty"

    body = request.get_json()
    nuevoUsuario = User(nombre=body["nombre"], apellido=body["apellido"], email=body["email"],
                        password=body["password"], rol=rol, is_active=True, created_at=date.today())
    db.session.add(nuevoUsuario)
    db.session.commit()
    print(request.json)
    return jsonify({'message': "Usuario Registrado"}), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if email != user.email:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    # usuario_id = User.query.get(current_user.serialize()["id"])
    # # print(usuario)
    # if usuario_id:
    #     return jsonify({"Resultado":current_user})
    # else:
    #     return jsonify({"resultado": "Usuario no existe"})
