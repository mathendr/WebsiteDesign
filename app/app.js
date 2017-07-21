var express = require('express');
var reload = require('reload');
var app = express();
var http = require('http')
var dataFile = require('./data/database.json');
var server = http.createServer();

app.set('port', process.env.PORT || 3000);
app.set('appData',dataFile);
app.set('view engine', 'ejs');
app.set('views','app/views');

app.locals.siteTitle = 'Prime';
app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/ProgramView'));
app.use(require('./routes/AccountView'));
app.use(require('./routes/Overview'));
app.use(require('./routes/worldmap'));
app.use(require('./routes/extrapage'));
app.use(require('./routes/help'));
app.use(require('./routes/Region'));

//var server = app.listen(app.get('port'), function () {
var server = app.listen(8000,'16.104.6.95', function () {
    console.log("Listening on port " + app.get('port'));
});
reload(server,app);

app.use(function (err, req, res, next) {
  res.status(500).send('Something broke!');
    console.log(err);
});

app.use(function (req, res, next) {
    res.status(404);
    if(req.accepts('html')){
        res.render("404Error",{
            pageTitle: "404 Error",
            pageID: "Page Not Found",
            Location: "../",
            current: "None"
        });
        return;
    }
    res.type("txt").send("Not Found");
});