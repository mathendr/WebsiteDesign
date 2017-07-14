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
cur.execute("SELECT * FROM ReservationsTable");
rows = cur.fetchall()
cur.execute("SELECT ProductName, Status FROM ProgramTable");
Active = cur.fetchall()
ActiveList = []
for row in Active:
    if(row[1] == "Active"):
        ActiveList.append(row[0])

rowarray_list = []
for row in rows:
    if(row[1] in ActiveList):
        t = OrderedDict()
        t["ID"] = row[0]
        t["ProgramName"] = row[1]
        t["AccountName"] = row[2]
        t["Region"] = row[3]
        rowarray_list.append(t)
io = StringIO()
json.dump(rowarray_list,io)
print(io.getvalue())