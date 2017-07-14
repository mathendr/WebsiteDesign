import pypyodbc
from collections import OrderedDict
import collections
from operator import itemgetter
import json
from StringIO import StringIO

pypyodbc.lowercase = False
conn = pypyodbc.connect(
r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
r"Dbq=C:\Users\penga\Documents\GitHub\WebsiteDesign\app\data\Prime_BE.accdb")
cur = conn.cursor()
cur.execute("SELECT distinct ProgramName FROM ReservationsTable");
rows = cur.fetchall()
cur.execute("SELECT ProductName, Status FROM ProgramTable");
Active = cur.fetchall()
ActiveList = []
for row in Active:
    if(row[1] == "Active"):
        ActiveList.append(row[0])
rowarray_list = []
for row in rows:
    if(row[0] in ActiveList):
        rowarray_list.append(row[0])
io = StringIO()
json.dump(rowarray_list,io)
print(io.getvalue())

#toJson()
#"SELECT distinct AccountName FROM ReservationsTable WHERE ProgramName = "