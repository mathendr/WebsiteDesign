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

router.get('/Contact/:Contact', function (req, res) {
    var pyshell = new PythonShell('app/data/getContact.py');
    pyshell.send("'"+req.params.Contact+"'");
    pyshell.on('message', function (message) {
        dataFile = JSON.parse(message);
        continued(req,res);
    });

    function continued(req, res) {
        res.render('Contact', {
            pageTitle: "Contact",
            pageID: "Contact",
            Location: "../",
            current: "home",
            Data: dataFile,
            Contact: req.params.Contact
        })
    }
});
module.exports = router;
