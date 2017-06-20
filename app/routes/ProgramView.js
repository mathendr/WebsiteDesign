var express = require('express');
var router = express.Router();


router.get('/Program/:ProjName', function (req, res) {
    var dataFile = req.app.get('appData');
    var item = dataFile.Data;
    var itemlist = [];
    for(i = 0; i < item.length; i++)
        {
            if(item[i].ProgramName.includes(req.params.ProjName)){
                itemlist = itemlist.concat(item[i]);
            }
        }
    res.render('ProgramView', {
        pageTitle: 'Program Overview',
        pageID: "Program Overview",
        ItemList: itemlist,
        Location: "../",
    });
});

module.exports = router;
