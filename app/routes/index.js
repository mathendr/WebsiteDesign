var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/', function (req, res) {
    var dataFile = require('../data/database.json');
    var ID = [];
    var ProjName = [];
    var AccName = [];
    dataFile.Data.forEach(function (item) {
        if(ProjName.includes(item.ProgramName))
            {
                
            }
        else
            ProjName = ProjName.concat(item.ProgramName);
    });
    res.render('index', {
        pageTitle: 'Home',
        pageID: "home",
        ProjName: ProjName.sort(),
        Location: "",
        current: "home"
    });
});

module.exports = router;
