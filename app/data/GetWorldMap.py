import pypyodbc
from collections import OrderedDict
import collections
from operator import itemgetter
import json

def toJson():
    pypyodbc.lowercase = False
    conn = pypyodbc.connect(
    r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
    r"Dbq=C:\Users\penga\Documents\GitHub\WebsiteDesign\app\data\Prime_BE.accdb")
    cur = conn.cursor()
    get = " ReservationID, ProgramName, AccountName, Region, Phase, Configuration"
    cur.execute("SELECT * FROM ReservationsTable");
    rows = cur.fetchall()
    rowarray_list = []
    print(rows[0][21])
    for row in rows:
        t = OrderedDict()
        t['ID'] = row[0]
        t['ProgramName'] = row[1].strip()
        t['AccountName'] = row[2].strip()
        t['Region'] = row[3].strip()
        t['Phase'] = row[4].strip()
        t['Configuration'] = row[5]
        t['Country'] = row[21]
        t['City'] = row[24]
        t['State'] = row[25]
        t['InTransit'] = row[73]
        t['HPEOffice'] = row[75]
        t['AwaitingInstallation'] = row[76]
        t['InstallationInProgress'] = row[77]
        t['Operational'] = row[78]
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