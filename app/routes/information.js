var express = require('express');
var router = express.Router();


router.get('/ID/:itemid', function (req, res) {
    var dataFile = req.app.get('appData');
    var itemlist = []
     dataFile.Data.forEach(function (thing){
         if(thing.ID == req.params.itemid){
             itemlist = itemlist.concat(thing);
         }
     });
    
    console.log(itemlist);
    res.render('IDView', {
        pageTitle: 'ID Overview',
        pageID: "idO verview",
        ItemList: itemlist,
        Location: "../",
        current: "home"
    });
});

module.exports = router;
