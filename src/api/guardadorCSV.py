import csv
import os
import sqlite3
import pandas as pd
import time
from csv import reader
import xlsxwriter

print("SOY UNA MAQUILA")

string = str(r'/workspace/Proyecto-xMile/src/git/outputs/')
fileName = str(r'/workspace/Proyecto-xMile/src/git/outputs/Facturas.csv')
fileExcel = str(r'/workspace/Proyecto-xMile/src/git/outputs/facturas.xlsx')

conn = sqlite3.connect('datosfacturas _V5.sqlite')
cur = conn.cursor()

cur.execute("SELECT * FROM Facturas")

rows = cur.fetchall()

# Extract the table headers.
headers = [i[0] for i in cur.description]

# Open CSV file for writing.
csvFile = csv.writer(open(fileName, 'w', newline=''),
                        delimiter=',', lineterminator='\r\n',
                        escapechar='\\')

# Add the headers and data to the CSV file.
csvFile.writerow(headers)
csvFile.writerows(rows)

print("Data export successful.")

time.sleep(5)

writer = pd.ExcelWriter(str(r'/workspace/Proyecto-xMile/src/git/outputs/facturas.xlsx'), engine='xlsxwriter')
writer.save()

time.sleep(5)

print("Excel file creation successful.")
