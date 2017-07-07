var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/Program/:ProjName', function (req, res) {
    var dataFile;
    var pyshell = new PythonShell('app/data/GetAccounts.py');
    pyshell.send("'"+req.params.ProjName+"'");
    pyshell.on('message',function(message){
        dataFile = JSON.parse(message);
        continued(res);
    });
   pyshell.end(function(err){
       if(err) throw err;
       console.log('finished');
   });
    function continued(res)
    {
        var itemlist = [];
        for(i = 0; i < dataFile.length; i++)
        {
            itemlist = itemlist.concat(dataFile[i]);
        }
        res.render('ProgramView', {
            pageTitle: 'Program Overview',
            pageID: "Program Overview",
            ItemList: itemlist.sort(),
            Location: "../",
            current: "home",
            URL: "/Program/"+req.params.ProjName
        });
    }
});

router.get('/Program/:ProjName/:AccountName', function (req, res) {
   var pyshell = new PythonShell('app/data/GetProjAccount.py');
    pyshell.send("'"+req.params.ProjName+"'");
    pyshell.send("'"+req.params.AccountName+"'");
    pyshell.on('message',function(message){
        dataFile = JSON.parse(message);
        continued(res);
    });
    function continued(res)
    {

        if (dataFile.length == 1) 
        {
            if (dataFile[0].Configuration != null)
                var config = dataFile[0].Configuration.split("\r\n");
            else
                var config = "";
            res.render('IDView', {
                pageTitle: 'Sever Overview',
                pageID: "Sever Overview",
                ItemList: dataFile,
                Config: config,
                Location: "../../../",
                current: "home"
            });
        }
        else{
            res.render('AccountView', {
                pageTitle: 'Account Overview',
                pageID: "Account Overview",
                ItemList: dataFile,
                Location: "../../",
                current: "home"
            });
        }
    };
});

router.get('/Program/:ProjName/:AccountName/:ID', function (req, res) {
    var dataFile;
    var pyshell = new PythonShell('app/data/GetID.py');
    pyshell.send("'"+req.params.ID+"'");
    pyshell.on('message',function(message){
        dataFile = JSON.parse(message);
        continued(res);
    });
    function continued(res)
    {
        if(dataFile[0].Configuration != null)
            var config = dataFile[0].Configuration.split("\r\n");
        else
            var config = "";
        res.render('IDView', {
            pageTitle: 'Sever Overview',
            pageID: "Sever Overview",
            ItemList: dataFile,
            Config: config,
            Location: "../../../",
            current: "home"
        });
    }
});

module.exports = router;
