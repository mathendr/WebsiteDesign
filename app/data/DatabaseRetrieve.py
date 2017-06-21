import pypyodbc
from collections import OrderedDict
import collections
from operator import itemgetter
import json

def toJson():
    pypyodbc.lowercase = False
    conn = pypyodbc.connect(
    r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
    r"Dbq=C:\Users\hendrima\Desktop\nodejs_practice\Prime_BE.accdb")
    cur = conn.cursor()
    cur.execute("SELECT ReservationID, ProgramName, AccountName, Region, Phase, Configuration  FROM ReservationsTable");
    rows = cur.fetchall()
    rowarray_list = []
    for row in rows:
        t = OrderedDict()
        t['ID'] = row[0]
        t['ProgramName'] = row[1]
        t['AccountName'] = row[2]
        t['Region'] = row[3]
        t['Phase'] = row[4]
        t['Configuration'] = row[5]
        rowarray_list.append(t)
    finalList = {'Data':sorted(rowarray_list,  key=lambda k: k['ID'])}
    file = 'app/data/database.json'
    f = open(file,'w')
    json.dump(finalList,f)
    f.close()
    cur.close()
    conn.close()


toJson()
print("Done")