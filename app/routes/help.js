var express = require('express');
var router = express.Router();

router.get('/help', function (req, res) {
    var dataFile = req.app.get('appData');
    var ID = [];
    var ProjName = [];
    var AccName = [];
    var Region = [];
    var Phase =[];
    dataFile.Data.forEach(function (item) {
        ID = ID.concat(item.ID);
        ProjName = ProjName.concat(item.ProgramName);
        AccName = AccName.concat(item.AccountName);
        Region = Region.concat(item.Region);
        Phase = Phase.concat(item.Phase);
    });
    res.render('help', {
        pageTitle: 'Home',
        pageID: "home",
        ID: ID,
        ProjName: ProjName,
        AccountName: AccName,
        Location: "",
        current: "help",
        Region: Region,
        Phase: Phase
        
    });
});

module.exports = router;