import pypyodbc
from collections import OrderedDict
import collections
from operator import itemgetter
import json
from StringIO import StringIO

pypyodbc.lowercase = False
file = open('app/data/resources.txt','r')
location = file.read()
conn = pypyodbc.connect(
r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
r"Dbq="+location+"\Prime_BE.accdb")
cur = conn.cursor()
name = input()
cur.execute("SELECT *FROM ReservationsTable WHERE ProgramName = '"+name+"'");
row = cur.fetchone()
rowarray_list = []
while row is not None:
    t = OrderedDict()
    t["AccountName"] = row[2]
    t['Region'] = row[3]
    t['Phase'] = row[4]
    t['InTransit'] = row[73]
    t['AtHPEOffice'] = row[75]
    t['AwaitingInstallation'] = row[76]
    t['InstallationInProgress'] = row[77]
    t['Operational'] = row[78]
    phase = " "
    if(t['InTransit'] == "X"):
        phase = ": In Transit"
    if(t['AtHPEOffice'] == "X"):
        phase = ": At HPE Office"
    if(t['AwaitingInstallation'] == "X"):
        phase = ": Awaiting Installation"
    if(t['InstallationInProgress'] == "X"):
        phase = ": Installation In Progress"
    if(t['Operational'] == "X"):
        phase = ": Operational"
    t['ShippingPhase'] = phase
    try:
        row = cur.fetchone()
    except:
        continue;
    
    rowarray_list.append(t)
io = StringIO()
json.dump(rowarray_list,io)
print(io.getvalue())