var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var dataFile;

router.get('/', function (req, res) {
    var pyshell = new PythonShell('app/data/homeInfo.py');
    pyshell.on('message', function (message) {
        dataFile = JSON.parse(message);
        continued(req,res);
    });

    function continued(req, res) {
        res.render('Index', {
            pageTitle: "Home",
            pageID: "Home Page",
            Location: "../",
            current: "home",
            Data: dataFile
        })
    }
});

module.exports = router;
