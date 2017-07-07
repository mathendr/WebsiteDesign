var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/worldmap', function (req, res) {
    var dataFile;
    PythonShell.run('app/data/DatabaseRetrieve.py',function(err, results){
        if(err) throw err;
        dataFile = JSON.parse(results);
    });
    var ID = [];
    var ProjName = [];
    var AccName = [];
    var Region = [];
    dataFile.Data.forEach(function (item) {
        ID = ID.concat(item.ID);
        ProjName = ProjName.concat(item.ProgramName);
        AccName = AccName.concat(item.AccountName);
        Region = Region.concat(item.Region);
    });
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
});

module.exports = router;
