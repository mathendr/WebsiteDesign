var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/Overview', function (req, res) {
    var dataFile;
    var pyshell = new PythonShell('app/data/OverviewData.py');
    pyshell.on('message',function(message){
        dataFile = JSON.parse(message);
        continued(res);
    });
    function continued(res)
    {
        var ID = [];
        var ProjName = [];
        var AccName = [];
        var Region = [];
        for(i = 0; i < dataFile.length; i++){
            ID = ID.concat(dataFile[i].ID);
            ProjName = ProjName.concat(dataFile[i].ProgramName);
            AccName = AccName.concat(dataFile[i].AccountName);
            Region = Region.concat(dataFile[i].Region);
        }
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
    };
});

module.exports = router;
