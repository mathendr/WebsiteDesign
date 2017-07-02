var express = require('express');
var router = express.Router();


router.get('/Program/:ProjName', function (req, res) {
    var dataFile = req.app.get('appData');
    var item = dataFile.Data;
    var itemlist = [];
    for(i = 0; i < item.length; i++)
        {
            if(item[i].ProgramName === (req.params.ProjName)){
                var cont = true;
                for(x = 0; x < itemlist.length; x++)
                {
                    if(itemlist[x].AccountName === item[i].AccountName)
                        cont = false;
                }
                if(cont)
                    itemlist = itemlist.concat(item[i]);
            }
        }
    itemlist = itemlist.sort(function(a,b){
            if(a.AccountName < b.AccountName)
                return -1;
            if(a.AccountName > b.AccountName)
                return 1;
            return 0;
        });
    res.render('ProgramView', {
        pageTitle: 'Program Overview',
        pageID: "Program Overview",
        ItemList: itemlist,
        Location: "../",
        current: "home"
    });
});

router.get('/Program/:ProjName/:AccountName', function (req, res) {
    var dataFile = req.app.get('appData');
    var item = dataFile.Data;
    var itemlist = [];
    for (i = 0; i < item.length; i++) {
        if ((item[i].ProgramName === req.params.ProjName) && (item[i].AccountName === req.params.AccountName)) 
        {
            itemlist = itemlist.concat(item[i]);
        }
    }

    if(itemlist.length == 1)
    {
          res.redirect('/Program/' +req.params.ProjName+ '/'+req.params.AccountName+'/' + itemlist[0].ID);  
    }
    else{
        res.render('AccountView', {
            pageTitle: 'Account Overview',
            pageID: "Account Overview",
            ItemList: itemlist,
            Location: "../../",
            current: "home"
        });
    }
});

router.get('/Program/:ProjName/:AccountName/:ID', function (req, res) {
    var dataFile = req.app.get('appData');
    var item = dataFile.Data;
    var itemlist = [];
    for (i = 0; i < item.length; i++) {
        if ((item[i].ID == req.params.ID)) 
        {
            itemlist = itemlist.concat(item[i]);
        }
    }
    res.render('IDView', {
        pageTitle: 'Sever Overview',
        pageID: "Sever Overview",
        ItemList: itemlist,
        Location: "../../../",
        current: "home"
    });
});

module.exports = router;
