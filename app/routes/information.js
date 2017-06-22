var express = require('express');
var router = express.Router();


router.get('/ID/:itemid', function (req, res) {
    var dataFile = req.app.get('appData');
    var item = dataFile.Data[req.params.itemid - 1];
    
     dataFile.Data.forEach(function (thing){
         if(thing.ID == req.params.itemid){
             item = thing;
         }
     });
    
    res.render('IDView', {
        pageTitle: 'ID Overview',
        pageID: "idO verview",
        ID: item.ID,
        Phase: item.Phase,
        ProjName: item.ProgramName,
        AccName: item.AccountName,
        Config: item.Configuration,
        Region: item.Region,
        Location: "../",
        current: "home"
    });
});

module.exports = router;
