/*
Equivalent of prime dashboard, link to graphical rep.

Adding sort by platform, region, country, city in that order. (NA by state)

Try to export table to excel

Security login bc people are idiots (more trouble than worth)

host on local ip address

*/

var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/database.json');

app.set('port', process.env.PORT || 3000);
app.set('appData',dataFile);
app.set('view engine', 'ejs');
app.set('views','app/views');

app.locals.siteTitle = 'Prime';

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/information'));
app.use(require('./routes/ProgramView'));
app.use(require('./routes/AccountView'));
app.use(require('./routes/Overview'));
app.use(require('./routes/worldmap'));
app.use(require('./routes/extrapage'));
app.use(require('./routes/help'));

var server = app.listen(app.get('port'), function () {
    console.log("Listening on port " + app.get('port'));
});

reload(server,app);