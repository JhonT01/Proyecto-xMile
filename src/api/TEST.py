import os
import xml.etree.ElementTree as ET
import re
import sqlite3
import time
from doc_elec import doc_elec
from nota_credito import nota_credito

print("SOY UNA MAQUILA")

client_id = 1

conn = sqlite3.connect('datosfacturas _V5.sqlite')
cur = conn.cursor()

cur.execute('DELETE FROM Facturas;',)
cur.execute('DELETE FROM sqlite_sequence where name="Facturas";',)

conn.commit()

cur.close()

count = 1

#Parte 1, debe iterar entre todos los archivos de un directorio X.
string = str(r'/workspace/Proyecto-xMile/src/git/xmls')

directory = os.fsencode(string)

for file in os.listdir(directory):
     #Parte 2, parsea cada xml.
     filename = os.fsdecode(file)

     count = count + 1

     #Parte 3, prueba si cada archivo es xml. De no ser asì, sale del root.
     if filename.endswith((".xml",".XML")) == True:

        parser = ET.XMLParser(encoding="utf-8")

        xml = string + "/" + filename

        persed = ET.parse(xml, parser=parser)

        #Parte 4, extrae el root, que contiene información útil.
        factura = persed.getroot()
        str_factura = str(factura)

        #Parte 5, verifica en el root si el xml corresponde a una factura, y no a otro tipo de comprobante electrónico.
        documento_re = re.findall('v4.3/(.*?)}', str_factura)
        documento_re = documento_re[0]
        print(documento_re)

        if documento_re == "facturaElectronica" or documento_re == "tiqueteElectronico" or documento_re == "facturaElectronicaExportacion" or documento_re == "notaDebitoElectronica":

            version_re = re.search("v4.\d",str_factura)
            version = version_re.group()

            #Parte 6, verifica en el root si la factura es v4.3, de lo contrario sale del if.
            if version == "v4.3" :

                doc_elec(client_id,xml,filename,factura,documento_re)

        elif "notaCreditoElectronica" in documento_re:

            version_re = re.search("v4.\d",str_factura)
            version = version_re.group()

            #Parte 6, verifica en el root si la factura es v4.3, de lo contrario sale del if.
            if version == "v4.3" :

                nota_credito(client_id,xml,filename,factura)

        else:
            print('>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<')
            print(filename, 'no es un combrobante electrónico.')
            print('>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<')

     else:
         print('/////////////////////////////////////////')
         print (filename, 'no es un archivo XML.')
         print('/////////////////////////////////////////')


cur.close()

time.sleep(10)

print(count)

#limpar id autoincrement
#delete from Facturas;
#delete from sqlite_sequence where name='Facturas';
