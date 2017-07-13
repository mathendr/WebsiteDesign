var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/worldmap', function (req, res) {
    var dataFile;
    PythonShell.run('app/data/worldmap.py',function(err, results){
        if(err) throw err;
        dataFile = JSON.parse(results);
        continued(req,res);
    });
    function continued(req, res) {

        var ID = [];
        var ProjName = [];
        var AccName = [];
        var Region = [];
        for(i = 0; i< dataFile.length; i++){
            ID = ID.concat(dataFile[i].ID);
            ProjName = ProjName.concat(dataFile[i].ProgramName);
            AccName = AccName.concat(dataFile[i].AccountName);
            Region = Region.concat(dataFile[i].Region);
        }
        res.render('worldmap', {
            pageTitle: 'Home',
            pageID: "home",
            ID: ID,
            ProjName: ProjName,
            AccountName: AccName,
            Location: "",
            Region: Region,
            current: "WorldMap"
        });
    };
});

module.exports = router;
