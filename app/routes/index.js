var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/', function (req, res) {
    var dataFile = require('../data/database.json');
    var ID = [];
    var ProjName = [];
    var AccName = [];
    dataFile.Data.forEach(function (item) {
        ID = ID.concat(item.ID);
        ProjName = ProjName.concat(item.ProgramName);
        AccName = AccName.concat(item.AccountName);
    });
    
//    PythonShell.run('app/data/DatabaseRetrieve.py',function(err,results){
//        if(err) 
//            throw err;
//        console.log(results);
//    });
    res.render('index', {
        pageTitle: 'Home',
        pageID: "home",
        ID: ID,
        ProjName: ProjName,
        AccountName: AccName,
        Location: ""
    });
});

module.exports = router;
