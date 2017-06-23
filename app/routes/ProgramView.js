var express = require('express');
var router = express.Router();


router.get('/Program/:ProjName', function (req, res) {
    var dataFile = req.app.get('appData');
    var item = dataFile.Data;
    var itemlist = [];
    for(i = 0; i < item.length; i++)
        {
            if(item[i].ProgramName === (req.params.ProjName)){
                itemlist = itemlist.concat(item[i]);
            }
        }
    res.render('ProgramView', {
        pageTitle: 'Program Overview',
        pageID: "Program Overview",
        ItemList: itemlist.sort(),
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


    res.render('AccountView', {
        pageTitle: 'Account Overview',
        pageID: "Account Overview",
        ItemList: itemlist,
        Location: "../../",
        current: "home"
    });
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

    console.log(itemlist[0]);
    res.render('IDView', {
        pageTitle: 'Sever Overview',
        pageID: "Sever Overview",
        ItemList: itemlist,
        Location: "../../../",
        current: "home"
    });
});

module.exports = router;
