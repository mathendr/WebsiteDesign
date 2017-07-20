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
cur.execute("SELECT ProductName, Status FROM ProgramTable");
Active = cur.fetchall()
ActiveList = []
for row in Active:
    if(row[1] == "Active"):
        ActiveList.append(row[0])

rowarray_list = []
cur.execute("SELECT * FROM ReservationsTable");
temp = 0
try:
    rows = cur.fetchone()
except:
    temp = 1
while row is not None:
    if(row[1] in ActiveList):
        t = OrderedDict()
        t["ID"] = row[0]
        t["ProgramName"] = row[1]
        t["AccountName"] = row[2]
        t["Region"] = row[3]
        rowarray_list.append(t)
    try:
        row = cur.fetchone()
    except:
        continue;
io = StringIO()
json.dump(rowarray_list,io)
print(io.getvalue())