import pypyodbc
from collections import OrderedDict
import collections
from operator import itemgetter
import json
from StringIO import StringIO

pypyodbc.lowercase = False
conn = pypyodbc.connect(
r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
r"Dbq=C:\Users\hendrima\Desktop\nodejs_practice\app\data\Prime_BE.accdb")
cur = conn.cursor()
progName = input()
AccName = input()
cur.execute("SELECT * FROM ReservationsTable WHERE ProgramName = '"+progName+"' AND AccountName = '"+AccName+"'");
rows = cur.fetchall()
rowarray_list = []
for row in rows:
    t = OrderedDict()
    t['ID'] = row[0]
    t['ProgramName'] = row[1].strip()
    t['AccountName'] = row[2].strip()
    t['Region'] = row[3].strip()
    t['Phase'] = row[4].strip()
    t['Configuration'] = row[5]
    if(row[21] is not None):
        t['Country'] = row[21].strip()
    else:
        t['Country'] = row[21]

    if(row[24] is not None):
        t['City'] = row[24]
    else:
        t['City'] = row[24]
    if(row[25] is not None):
        t['State'] = row[25].strip()
    else:
        t['State'] = row[25]
    t['InTransit'] = row[73]
    t['HPEOffice'] = row[75]
    t['AwaitingInstallation'] = row[76]
    t['InstallationInProgress'] = row[77]
    t['Operational'] = row[78]
    rowarray_list.append(t)
io = StringIO()
json.dump(rowarray_list,io)
print(io.getvalue())