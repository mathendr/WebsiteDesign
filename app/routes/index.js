var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');
var dataFile;


router.get('/', function (req, res) {
    var pyshell = new PythonShell('app/data/GetServers.py');
    pyshell.on('message',function(message){
        dataFile = JSON.parse(message);
        continued(res);
    });
    function continued(res){
        var ProjName = [];
        for(i = 0; i < dataFile.length; i++)
             ProjName = ProjName.concat(dataFile[i]);
        res.render('index', {
            pageTitle: 'Home',
            pageID: "home",
            ProjName: ProjName.sort(),
            Location: "",
            current: "home"
        });
    };
});

module.exports = router;
