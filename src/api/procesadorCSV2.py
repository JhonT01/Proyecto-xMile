
import pandas as pd
import unicodedata
from numpy import NaN, NAN, nan
from datetime import datetime
import time

print("SOY UNA MAQUILA")

#['id', , 'doc', 'num_fac', 'lin_fac', 'fecha', 'proveedor', 'ced_prov', 'cliente',
#       'ced_clien', 'moneda', 'actividad', 'codigo', 'detalle', 'tarifa',
#       'monto_linea', 'gravado', 'exento', 'exonerado', 'si_otro', 'impuesto',
#       'mon_total'],

# Use enconding ISO, for some reason guardadorCSV doesn't generate a UTF-8 CSV.
facdf = pd.read_csv(str(r'/workspace/Proyecto-xMile/src/git/outputs/Facturas.csv'), encoding = "ISO-8859-1")

tcdf = pd.read_csv(str(r'/workspace/Proyecto-xMile/src/git/outputs/TCBCCR_2010_2020.csv'))

cabys = pd.read_csv(str(r'/workspace/Proyecto-xMile/src/git/outputs/cabys.csv'))

actividades = pd.read_csv(str(r'/workspace/Proyecto-xMile/src/git/outputs/actividades.csv'))



# Normalize the characters in each of the following columns, to avoid automatic
#replacement with strange strings.

facdf['num_fac'] = facdf['num_fac'].astype(str)

facdf['detalle'] = facdf['detalle'].astype(str)

facdf['num_fac'] = (facdf['num_fac'].map(lambda x: str("00") + x))

facdf['proveedor'] = (facdf['proveedor']
                        .map(lambda x: unicodedata.normalize('NFKD', x))
                        .str.encode('ascii', errors='ignore')
                        .str.decode('utf-8'))

#facdf['cliente'] = (facdf['cliente'].to_str()
                        #.map(lambda x: unicodedata.normalize('NFKD', x))
                        #.str.encode('ascii', errors='ignore')
                        #.str.decode('utf-8'))

facdf['detalle'] = (facdf['detalle']
                        .map(lambda x: unicodedata.normalize('NFKD', x))
                        .str.encode('ascii', errors='ignore')
                        .str.decode('utf-8'))

cabys['descripcion'] = (cabys['descripcion']
                        .map(lambda x: unicodedata.normalize('NFKD', x))
                        .str.encode('ascii', errors='ignore')
                        .str.decode('utf-8'))

actividades['nombre'] = (actividades['nombre']
                        .map(lambda x: unicodedata.normalize('NFKD', x))
                        .str.encode('ascii', errors='ignore')
                        .str.decode('utf-8'))


# Convert the date indexes to date-time format.

facfechas = pd.to_datetime(facdf['fecha'], format= '%Y-%m-%d')

tcfechas = pd.to_datetime(tcdf['Fecha'], format= '%d-%m-%Y')

#cabys['codigo'] = cabys['codigo'].astype(int)

# Insert the date time format values into the dataframes.

facdf['fecha'] = (facfechas)

tcdf['Fecha'] = (tcfechas)

# Merge the invoice dataframe and the FX dataframes. Keep all the values of
# the left.

facdf.loc[facdf['codigo'] == 'None', 'codigo'] =  0

facdf = facdf.merge(tcdf, how='left', left_on='fecha', right_on='Fecha')

facdf = facdf.merge(cabys, how='left', left_on='codigo', right_on='codigo')

facdf = facdf.merge(actividades, how='left', left_on='actividad', right_on='codigo')

# Drop the unneccesary columns.

print(facdf.shape)

#facdf = facdf.drop(['Fecha', 'TIPO CAMBIO COMPRA', 'Unnamed: 3', 'Unnamed: 4',
                    #'Unnamed: 5', 'Unnamed: 6', 'Unnamed: 7',
                    #'Unnamed: 8', 'Unnamed: 9', 'codigo_y'], axis=1)

# Convert the amount columns to CRC, depending on the "moneda" column

# In case the invoice doesn't have the FX information, or it's something
# different to USD or CRC. In that case, the person will have to
# check which invoices have a different FX in the final report.

facdf.loc[facdf['moneda'] == 0, 'Comentario'] =  'SIN INFORMACION DE MONEDA. SE PRESUME CRC.'
facdf.loc[facdf['moneda'] == 0, 'moneda'] =  'CRC'
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Comentario'] =  'OTRA MONEDA'
facdf.loc[facdf['moneda'] == 'CRC', 'Comentario'] =  NaN
facdf.loc[facdf['moneda'] == 'USD', 'Comentario'] =  NaN

# Subtotal Línea CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Subtotal Línea CRC'] = facdf['monto_linea']
facdf.loc[facdf['moneda'] == 'USD', 'Subtotal Línea CRC'] = facdf['monto_linea'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Subtotal Línea CRC'] = facdf['monto_linea']

# Descuento CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'descuento'] = facdf['descuento']
facdf.loc[facdf['moneda'] == 'USD', 'Descuento CRC'] = facdf['descuento'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Descuento CRC'] = facdf['descuento']

# Monto Gravado CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Monto Gravado CRC'] = facdf['gravado']
facdf.loc[facdf['moneda'] == 'USD', 'Monto Gravado CRC'] = facdf['gravado'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Monto Gravado CRC'] = facdf['gravado']

# Monto Exento CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Monto Exento CRC'] = facdf['exento']
facdf.loc[facdf['moneda'] == 'USD', 'Monto Exento CRC'] = facdf['exento'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Monto Exento CRC'] = facdf['exento']

# Monto Exonerado CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Monto Exonerado CRC'] = facdf['exonerado']
facdf.loc[facdf['moneda'] == 'USD', 'Monto Exonerado CRC'] = facdf['exonerado'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Monto Exonerado CRC'] = facdf['exonerado']

# Monto Otro CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Monto Otro CRC'] = facdf['si_otro']
facdf.loc[facdf['moneda'] == 'USD', 'Monto Otro CRC'] = facdf['si_otro'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Monto Otro CRC'] = facdf['si_otro']

# Monto IVA CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Monto IVA CRC'] = facdf['impuesto']
facdf.loc[facdf['moneda'] == 'USD', 'Monto IVA CRC'] = facdf['impuesto'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Monto IVA CRC'] = facdf['impuesto']

# Monto Total CRC
facdf.loc[facdf['moneda'] != {'CRC', 'USD'}, 'Monto Total CRC'] = facdf['mon_total']
facdf.loc[facdf['moneda'] == 'USD', 'Monto Total CRC'] = facdf['mon_total'] * facdf['TIPO DE CAMBIO VENTA']
facdf.loc[facdf['moneda'] == 'CRC', 'Monto Total CRC'] = facdf['mon_total']

# XXXXXXXX
facdf['XXXXXXXX'] = NaN
facdf['Tipo'] = NaN
facdf['Periodo'] = pd.to_datetime(facdf['fecha'])
facdf = facdf.rename(columns={"codigo_x":"codigo"}, errors="raise")


#facdup = facdf[facdf.duplicated()]

print(facdf.columns)
print(facdf.head())

facdf.to_csv(str(r'/workspace/Proyecto-xMile/src/git/outputs/pandasfac.csv'), index=False)


print('THE CSV FILE WAS PROCESSED SUCCESFULY')


time.sleep(5)

#print(facdup.shape)
#print(facdup.head())
