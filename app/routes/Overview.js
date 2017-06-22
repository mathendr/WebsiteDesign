var express = require('express');
var router = express.Router();

router.get('/Overview', function (req, res) {
    var dataFile = req.app.get('appData');
    var ID = [];
    var ProjName = [];
    var AccName = [];
    dataFile.Data.forEach(function (item) {
        ID = ID.concat(item.ID);
        ProjName = ProjName.concat(item.ProgramName);
        AccName = AccName.concat(item.AccountName);
    });
    res.render('Overview', {
        pageTitle: 'Home',
        pageID: "home",
        ID: ID,
        ProjName: ProjName,
        AccountName: AccName,
        Location: "",
        current: "servername"
    });
});

module.exports = router;
