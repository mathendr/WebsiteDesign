var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/Account',function(req,res){
    var dataFile;
    var pyshell = new PythonShell('app/data/GetAccounts.py');
    pyshell.send()
    pyshell.on('message',function(message){
        dataFile = JSON.parse(message);
        continued(res);
    });
    function continued(res)
    {
        var item = dataFile.Data;
        var itemlist = [];
        for(i = 0; i < item.length; i++)
        {
            if(itemlist.indexOf(item[i].AccountName) == -1)
                itemlist = itemlist.concat(item[i].AccountName);
        }
        res.render('AccountOverview', {
            pageTitle: 'Account Overview',
            pageID: "Account Overview",
            ItemList: itemlist.sort(),
            Location: "../",
            current: "accountlist"
        });
    }
});

router.get('/Account/:AccountName', function (req, res) {
    var dataFile;
    PythonShell.run('app/data/DatabaseRetrieve.py',function(err, results){
        if(err) throw err;
        dataFile = JSON.parse(results);
    });
    var item = dataFile.Data;
    var itemlist = [];
    for(i = 0; i < item.length; i++)
        {
            if(item[i].AccountName === (req.params.AccountName)){
                itemlist = itemlist.concat(item[i]);
            }
        }
    res.render('AccountView', {
        pageTitle: 'Account Overview',
        pageID: "Account Overview",
        ItemList: itemlist,
        Location: "../",
        current: "accountlist"
    });
});

module.exports = router;