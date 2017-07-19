import pypyodbc
from collections import OrderedDict
import collections
from operator import itemgetter
import json
from StringIO import StringIO

pypyodbc.lowercase = False
#file = open('app/data/resources.txt','r')
#location = file.read()
conn = pypyodbc.connect(
r"Driver={Microsoft Access Driver (*.mdb, *.accdb)};" +
r"Dbq=C:\Users\hendrima\Desktop\nodejs_practice\app\data\Prime_BE.accdb")
cur = conn.cursor()
t = OrderedDict()
fullArray = []
cur.execute("SELECT distinct ctc_BetaCoordName FROM ProgramTable");
rows = cur.fetchall()
betaCoord = []
for row in rows:
    betaCoord.append(row[0])
t["BetaCoord"] = betaCoord



cur.execute("SELECT distinct ctc_BetaTechName FROM ProgramTable")
rows = cur.fetchall()
betaTech = []
for row in rows:
    betaTech.append(row[0])
t["betaTech"] = betaTech


cur.execute("SELECT distinct ctc_BetaManagerName FROM ProgramTable")
rows = cur.fetchall()
betaManager = []
for row in rows:
    betaManager.append(row[0])
t["betaManager"] = betaManager


cur.execute("SELECT distinct ctc_MarketingCoord FROM ProgramTable")
rows = cur.fetchall()
betaMarketing = []
for row in rows:
    betaMarketing.append(row[0])
t["betaMarketing"] = betaMarketing



io = StringIO()
json.dump(t,io)
print(io.getvalue())
