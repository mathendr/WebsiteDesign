var express = require('express');
var router = express.Router();

router.get('/Account/:AccountName', function (req, res) {
    var dataFile = req.app.get('appData');
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
        current: "home"
    });
});

module.exports = router;