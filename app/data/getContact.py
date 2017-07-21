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
t = OrderedDict()
fullArray = []
cur.execute("SELECT * FROM ProgramTable WHERE Status = 'Active'");
row = cur.fetchone()
betaCoord = []
while row is not None:
    if(name in row):
        betaCoord.append(row[2])
    try:
        row = cur.fetchone()
    except:
        continue;


cur.execute("SELECT Email FROM UsersTable WHERE Name = '" + name + "'")
rows = cur.fetchall()
for row in rows:
    betaCoord.append(row[0])
    
io = StringIO()
json.dump(betaCoord,io)
print(io.getvalue())