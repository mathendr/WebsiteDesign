var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/Overview', function (req, res) {
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
    res.render('Overview', {
        pageTitle: 'Home',
        pageID: "home",
        ID: ID,
        ProjName: ProjName,
        AccountName: AccName,
        Location: "",
        current: "servername",
        Region: Region
    });
});

module.exports = router;
