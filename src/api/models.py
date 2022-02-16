from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    nombre = db.Column(db.String(250), unique=False, nullable=False)
    apellido =  db.Column(db.String(250), unique=False, nullable=False)
    rol =  db.Column(db.String(100), unique=False, nullable=False)
    created_at =  db.Column(db.DateTime(), unique=False, nullable=False)
    user_clients = db.relationship("User_Client", backref="user", lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
            # do not serialize the password, its a security breach
        }

class Client(db.Model):
    __tablename__ = 'client'
    id = db.Column(db.Integer, primary_key=True)
    fiscal_id = db.Column(db.String, unique=True, nullable=False)
    razon_social = db.Column(db.String(80), unique=False, nullable=False)
    client_users = db.relationship("User_Client",  backref="client", lazy=True)
    client_factura = db.relationship("Factura",  backref="client", lazy=True)

    def __repr__(self):
        return '<Client %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "fiscal_id": self.fiscal_id,
            "razon_social": self.razon_social
        }

class Factura(db.Model):
    __tablename__ = 'factura'
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), unique=False, nullable=False)
    doc = db.Column(db.String(100), unique=False, nullable=False)
    num_fac = db.Column(db.String(100), unique=False, nullable=False)
    fecha = db.Column(db.DateTime(), unique=False, nullable=False)
    emisor = db.Column(db.String(100), unique=False, nullable=False)
    emisor_id = db.Column(db.String(100), unique=False, nullable=False)
    receptor = db.Column(db.String(100), unique=False, nullable=False)
    receptor_id = db.Column(db.String(100), unique=False, nullable=False)
    moneda = db.Column(db.String(100), unique=False, nullable=False)
    actividad = db.Column(db.Integer, unique=False, nullable=False)
    factura_detalles = db.relationship("Factura_detalle",  backref="factura", lazy=True)

    def __repr__(self):
        return '<Factura %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "doc": self.doc,
            "num_fac": self.num_fac,
            "fecha": self.fecha,
            "emisor": self.emisor,
            "emisor_id": self.emisor_id,
            "receptor": self.receptor,
            "receptor_id": self.receptor_id,
            "moneda": self.moneda,
            "actividad": self.actividad
        }

class Factura_detalle(db.Model):
    __tablename__ = 'factura_detalle'
    id = db.Column(db.Integer, primary_key=True)
    factura_id = db.Column(db.Integer, db.ForeignKey('factura.id'), unique=False, nullable=False)
    lin_fac = db.Column(db.Integer, unique=False, nullable=False)
    codigo = db.Column(db.String(100), unique=False, nullable=True)
    detalle = db.Column(db.String(100), unique=False, nullable=True)
    tarifa = db.Column(db.String(10), unique=False, nullable=True)
    precio_unit = db.Column(db.Float, unique=False, nullable=True)
    cantidad = db.Column(db.Float, unique=False, nullable=True)
    unidad = db.Column(db.String(100), unique=False, nullable=True)
    gravado_isc = db.Column(db.Float, unique=False, nullable=True)
    exento_isc = db.Column(db.Float, unique=False, nullable=True)
    imp_especif = db.Column(db.Float, unique=False, nullable=True)
    monto_linea = db.Column(db.Float, unique=False, nullable=True)
    gravado = db.Column(db.Float, unique=False, nullable=True)
    exento = db.Column(db.Float, unique=False, nullable=True)
    exonerado = db.Column(db.Float, unique=False, nullable=True)
    si_otro = db.Column(db.Float, unique=False, nullable=True)
    descuento = db.Column(db.Float, unique=False, nullable=True)
    subtotal = db.Column(db.Float, unique=False, nullable=True)
    monto_isc = db.Column(db.Float, unique=False, nullable=True)
    impuesto = db.Column(db.Float, unique=False, nullable=True)
    mon_total = db.Column(db.Float, unique=False, nullable=True)
    auto_exon = db.Column(db.String(100), unique=False, nullable=True)
    fecha_exon = db.Column(db.String(100), unique=False, nullable=True)   

    def __repr__(self):
        return '<Factura_detalle %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "factura_id": self.factura_id,
            "lin_fac": self.lin_fac,
            "codigo" : self.codigo,
            "detalle": self.detalle,
            "tarifa": self.tarifa,
            "precio_unit": self.precio_unit,
            "cantidad": self.cantidad,
            "unidad": self.unidad,
            "gravado_isc": self.gravado_isc,
            "exento_isc": self.exento_isc,
            "imp_especif": self.imp_especif,
            "monto_linea": self.monto_linea,
            "gravado": self.gravado,
            "exento": self.exento,
            "exonerado": self.exonerado,
            "si_otro": self.si_otro,
            "descuento": self.descuento,
            "subtotal": self.subtotal,
            "monto_isc": self.monto_isc,
            "impuesto": self.impuesto,
            "mon_total": self.mon_total,
            "auto_exon": self.auto_exon,
            "fecha_exon": self.fecha_exon
        }

# --------------------- Tablas Pivote -------------------------------------------------------

class User_Client(db.Model):
    __tablename__ = 'user_Client'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=False, nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), unique=False, nullable=False)
    #user = db.relationship("User", back_populates="user.id")
    #client = db.relationship("Client", back_populates="client.id")

    def __repr__(self):
        return '<User_Client %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "client_id": self.client_id,
            "user_email": User.query.get(self.user_id).serialize()["email"]
        }
