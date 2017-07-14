var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/Program/:ProjName', function (req, res) {
    var dataFile;
    var pyshell = new PythonShell('app/data/GetAccounts.py');
    pyshell.send("'"+req.params.ProjName.replace("_","/")+"'");
    pyshell.on('message',function(message){
        dataFile = JSON.parse(message);
        continued(res,req);
    });
    
    function continued(res,req)
    {
        var itemList = [];
        var regions = []
        for(i = 0; i < dataFile.length; i++)
        {
            itemList = itemList.concat(dataFile[i]);
            regions = regions.concat(dataFile[i].Region);
        }
        itemList.sort(function(a,b){
        if(a.AccountName > b.AccountName){
            return 1;
        }else if(a.AccountName < b.AccountName){
            return -1;
        }
        return 0;
        });
        res.render('ProgramView', {
            pageTitle: 'Program Overview',
            pageID: "Program Overview",
            ItemList: itemList,
            Regions: regions,
            Location: "../",
            current: "home",
            URL: "/Program/"+req.params.ProjName,
            ProjName: req.params.ProjName.replace("_","/")
        });
    }
});

router.get('/Program/:ProjName/:AccountName', function (req, res) {
   var pyshell = new PythonShell('app/data/GetProjAccount.py');
    pyshell.send("'"+req.params.ProjName.replace("_","/")+"'");
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

//router.get('/Program/:ProjName/:AccountName/:ID', function (req, res) {
//    var dataFile;
//    var pyshell = new PythonShell('app/data/GetID.py');
//    pyshell.send("'"+req.params.ID+"'");
//    pyshell.on('message',function(message){
//        dataFile = JSON.parse(message);
//        continued(res);
//    });
//    function continued(res)
//    {
//        if(dataFile[0].Configuration != null)
//            var config = dataFile[0].Configuration.split("\r\n");
//        else
//            var config = "";
//        res.render('IDView', {
//            pageTitle: 'Sever Overview',
//            pageID: "Sever Overview",
//            ItemList: dataFile,
//            Config: config,
//            Location: "../../../",
//            current: "home"
//        });
//    }
//});

module.exports = router;
