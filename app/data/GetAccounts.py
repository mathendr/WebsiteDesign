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
name = input()
cur.execute("SELECT distinct AccountName FROM ReservationsTable WHERE ProgramName = '"+name+"'");
rows = cur.fetchall()
rowarray_list = []
for row in rows:
    rowarray_list.append(row[0])
io = StringIO()
json.dump(rowarray_list,io)
print(io.getvalue())