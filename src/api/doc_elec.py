import os
import xml.etree.ElementTree as ET
from .models import db, Factura, Factura_detalle
import re
import sqlite3
import time

def doc_elec(client_id,xml,filename,factura,tipo):

    #el url es el nameholder de todo el xml.
    #Está al inicio de todos los nombres de los elementos, incluso si no aparecen visualmente en el arbol.
    namehold = f"{{https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/{tipo}}}"
    nombrar = lambda a: namehold + str(a)

    #debido a lo anterior, es necesario combinar el url y el nombre de cada nodo. De lo contrario, no será detectado.
    #Primero se determinan las variables de los elementos

    ubi_otros = nombrar('OtrosCargos')
    ubi_detalle = nombrar('DetalleServicio')
    ubi_lin_detalle = nombrar('LineaDetalle')
    ubi_emisor = nombrar('Emisor')
    nombre_proveedor = nombrar('Nombre')
    ubi_cedprov = nombrar('Identificacion')
    cedula_proveedor= nombrar('Numero')
    ubi_cliente = nombrar('Receptor')
    nombre_cliente = nombrar('Nombre')
    ubi_cedclien= nombrar('Identificacion')
    cedula_cliente= nombrar('Numero')
    ubi_resumen = nombrar('ResumenFactura')
    ubi_moneda = nombrar('CodigoTipoMoneda')
    ubi_descuento = nombrar('Descuento')
    ubi_impuesto = nombrar('Impuesto')
    ubi_exoneracion = nombrar('Exoneracion')

    #Y luego el nombre de los atributos que queremos extraer.

    #lineas de detalle
    elemento_consec= nombrar('NumeroConsecutivo')
    elemento_actividad= nombrar('CodigoActividad')
    elemento_fecha=nombrar('FechaEmision')
    elemento_num_lin = nombrar('NumeroLinea')
    elemento_detalle = nombrar('Detalle')
    elemento_montoTotal = nombrar('MontoTotal')
    elemento_subtotal = nombrar('SubTotal')
    elemento_gravado = nombrar('TotalGravado')
    elemento_exonerado = nombrar('TotalExonerado')
    elemento_descuento = nombrar('MontoDescuento')
    elemento_impuesto = nombrar('Monto')
    elemento_tarifa = nombrar('Tarifa')
    elemento_otcar = nombrar('MontoCargo')
    elemento_total = nombrar('MontoTotalLinea')
    elemento_codigo = nombrar('Codigo')
    elemento_cantidad = nombrar('Cantidad')
    elemento_unidad = nombrar('UnidadMedida')
    elemento_precioUni = nombrar('PrecioUnitario')
    elemento_montoExon = nombrar('MontoExoneracion')
    elemento_docExon = nombrar('NumeroDocumento')
    elemento_fechaExon = nombrar('FechaEmision')


    #factura entera
    elemento_moneda = nombrar('CodigoMoneda')
    elemento_exento = nombrar('TotalExento')

    #Imprime los datos que queremos.
    print('=====================================')
    print('Leyendo factura electrónica:', xml)
    print('=====================================')

    doc_name = filename.rstrip(".xmlXML")

    print(doc_name)

    #estos loops ubican los elementos, y luego los sub elementos que queremos.
    val_numfac = str(factura.find(elemento_consec).text)
    print('Numero de factura ', val_numfac)

    val_fecha = str(factura.find(elemento_fecha).text)
    val_fecha = str(val_fecha[0:10])
    print('2.Fecha de emisión ', val_fecha)

    val_actividad = str(factura.find(elemento_actividad).text)
    print('Código de actividad comercial: ', val_actividad)

    for dato in factura.iter(ubi_emisor):
        val_proveedor = str(dato.find(nombre_proveedor).text)
        print('Nombre de proveedor ', val_proveedor)

    for numero in dato.iter(ubi_cedprov):
        val_cedulaprov = str(numero.find(cedula_proveedor).text)
        print('Numero de cedula ', val_cedulaprov)

    #Dependiendo del tipo de comprobante, puede que no sea obligatorio
    #consignar el número de ID del cliente, por lo cual se debe
    #asignar un valor temporal a esas variables.

    val_cliente = str(0)
    val_cedulaclien = str(0)

    try:
        for dato in factura.iter(ubi_cliente):
            val_cliente = str(dato.find(nombre_cliente).text)
            print('Nombre de cliente ', val_cliente)

    except:
        val_cliente = str(0)
        print('No se detectó el nombre del receptor del comprobante.')


    try:
        for numero in dato.iter(ubi_cedclien):
            val_cedulaclien = str(numero.find(cedula_cliente).text)
            print('6.Numero de cedula ', val_cedulaclien)
    except:
        val_cedulaclien = str(0)
        print('No se detectó el número de ID del receptor del comprobante.')

    #por algun motivo no se genera un error cuando el for no encuentra
    #la dirección que está buscando. Por eso, si no se define la variable
    #afuera, y no ocurre la iteración, es como si la variable no existiese.
    val_moneda = str(0)

    try:
        for dato in factura.iter(ubi_resumen):
            for moneda in dato.iter(ubi_moneda):

                val_moneda = str(moneda.find(elemento_moneda).text)
                print('Moneda de la transacción ', val_moneda)
    except:

        val_moneda = str(0)
        print('No se detectó información de moneda de transacción.')

        print('El detalle de la factura es el siguiente:')

    #Insertar en SQLAlchemy

    factura_general = Factura(
    client_id = client_id,
    doc = doc_name,
    num_fac = val_numfac,
    fecha = val_fecha,
    emisor = val_proveedor,
    emisor_id = val_cedulaprov,
    receptor = val_cliente,
    receptor_id = val_cedulaclien,
    moneda = val_moneda,
    actividad = val_actividad
    )

    db.session.add(factura_general)
    db.session.commit()

    num = 900


    for instancia in factura.iter(ubi_lin_detalle):

        for detalle in instancia.iter(ubi_lin_detalle):
            val_num_det = str(detalle.find(elemento_num_lin).text)
            print('Línea de detalle Nº:', val_num_det)
            val_detalle = str(detalle.find(elemento_detalle).text)
            print('Detalle de línea:', val_detalle)
            val_montoTotal = str(detalle.find(elemento_montoTotal).text)
            print('Monto Total de línea: ', val_montoTotal)
            val_cantidad = str(detalle.find(elemento_cantidad).text)
            print('Cantidad de línea ', val_cantidad)
            val_unidad = str(detalle.find(elemento_unidad).text)
            print('Unidad de medida de bien/servicio: ', val_unidad)
            val_precioUni = str(detalle.find(elemento_precioUni).text)
            print('Precio unitario de bien/servicio: ', val_precioUni)

            
            val_descuento = str(0)
            val_otroCargo = str(0)

            try:
                for dato in detalle.iter(ubi_descuento):
                    val_descuento = str(dato.find(elemento_descuento).text)
                    print('Monto de descuento: ', val_descuento)

            except:
                print('No se detectó descuento')


            val_subtotal = str(detalle.find(elemento_subtotal).text)
            print('Sub total de línea: ', val_subtotal)



            val_codigo = str(0)

            try:
                val_codigo = str(detalle.find(elemento_codigo).text)
                print('Código de bien/servicio:', val_codigo)

            except:
                print('No sedetectó código de bien/servicio.')

            val_impuesto = str(0)
            val_tarifa = str("0%")
            val_montExon = str(0)
            val_docExon = str(0)
            val_fechaExon = str(0)


            try:
                for dato in detalle.iter(ubi_impuesto):

                    if str(dato.find(elemento_tarifa).text) == '0.00':
                        val_exento = val_subtotal
                        val_tarifa = str("0%")
                        val_impuesto = str(0)
                        print('*************************************')
                        print('*************************************')
                        print('ELEMENTO TARIFA 0')
                        print('*************************************')
                        print('*************************************')

                    else:

                        val_impuesto = str(dato.find(elemento_impuesto).text)
                        print('Impuesto de línea: ', val_impuesto)

                        val_tarifa = str(dato.find(elemento_tarifa).text)+'%'
                        print('Tarifa impuesto de línea: ', val_tarifa)

                    try:
                        for dato in detalle.iter(ubi_exoneracion):
                            print('Se detectó una exoneración:')
                            val_montExon = str(dato.find(elemento_montoExon).text)
                            print('Monto Exonerado: ', val_montExon)
                            val_impuesto = str(float(val_impuesto) - float(val_montExon))
                            print('Monto de impuesto final: ', val_montExon)
                            val_docExon = str(dato.find(elemento_docExon).text)
                            val_fechaExon = str(dato.find(elemento_fechaExon).text)

                    except:
                        val_montExon = str(0)


            except:
                print('Impuesto de línea: ', val_impuesto)
                print('Tarifa impuesto de línea: ', val_tarifa)

            if val_impuesto != str(0):
                val_gravado = val_subtotal
                val_exento = str(0)
            else:
                val_exento = val_subtotal
                val_gravado = str(0)

            val_total = str(detalle.find(elemento_total).text)
            print('Total línea: ', val_total)

            factura_detalle = Factura_detalle(
            factura_id = factura_general.id,
            lin_fac = val_num_det,
            codigo = val_codigo,
            detalle = val_detalle,
            tarifa = val_tarifa,
            precio_unit = val_precioUni,
            cantidad = val_cantidad,
            unidad = val_unidad,
            gravado_isc = 0,
            exento_isc = 0,
            imp_especif = 0,
            monto_linea = val_montoTotal,
            gravado = val_gravado,
            exento = val_exento,
            exonerado = val_montExon,
            si_otro = val_otroCargo,
            descuento = val_descuento,
            subtotal = val_subtotal,
            monto_isc = 0,
            impuesto = val_impuesto,
            mon_total = val_total,
            auto_exon = val_docExon,
            fecha_exon = val_fechaExon

            )

            db.session.add(factura_detalle)
            db.session.commit()   

    try:
        for instancia in factura.iter(ubi_otros):
            
            for detalle in instancia.iter(ubi_otros):

                val_montoTotal = 0
                val_subtotal = 0
                val_exento = 0

                print('Se detectaron Otros Cargos en la factura:')
                val_detalle = str(detalle.find(elemento_detalle).text)
                print('Detalle de Otros Cargos: ', val_detalle)
                val_otroCargo = str(detalle.find(elemento_otcar).text)
                print('Sub Total de línea: ', val_otroCargo)


                val_codigo = str(0)

                try:
                    val_codigo = str(detalle.find(elemento_codigo).text)
                    print('Código de bien/servicio:', val_codigo)

                except:
                    print('No se detectó código de bien/servicio.')

                val_num_det = 999
                val_subtotal = val_otroCargo
                val_montoTotal = val_otroCargo
                val_gravado = str(0)
                val_exento = str(0)
                val_total = val_otroCargo
                val_tarifa = str(0)
                val_impuesto = str(0)

            factura_detalle = Factura_detalle(
            factura_id = factura_general.id,
            lin_fac = val_num_det,
            codigo = val_codigo,
            detalle = val_detalle,
            tarifa = val_tarifa,
            precio_unit = val_precioUni,
            cantidad = val_cantidad,
            unidad = val_unidad,
            gravado_isc = 0,
            exento_isc = 0,
            imp_especif = 0,
            monto_linea = val_montoTotal,
            gravado = val_gravado,
            exento = val_exento,
            exonerado = val_montExon,
            si_otro = val_otroCargo,
            descuento = val_descuento,
            subtotal = val_subtotal,
            monto_isc = 0,
            impuesto = val_impuesto,
            mon_total = val_total,
            auto_exon = val_docExon,
            fecha_exon = val_fechaExon

            )

            db.session.add(factura_detalle)
            db.session.commit()  

    except:
        print('No se detectaron Otros Cargos en la factura.')
