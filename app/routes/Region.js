var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

router.get('/Region', function (req, res) {
    var dataFile = require('../data/database.json');
    var ID = [];
    var Regions = [];
    var AccName = [];
    dataFile.Data.forEach(function (item) {
        if(Regions.includes(item.Region))
            {
                
            }
        else
            Regions = Regions.concat(item.Region);
    });
    res.render('Regions', {
        pageTitle: 'Region',
        pageID: "region",
        Regions: Regions.sort(),
        Location: "../",
        current: "Regions"
    });
});


router.get('/Region/:Region', function (req, res) {
    var dataFile = require('../data/database.json');
    var ID = [];
    var Country = [];
    var AccName = [];
    dataFile.Data.forEach(function (item) {
        if(item.Region === req.params.Region && !Country.includes(item.Country))
        {
            Country = Country.concat(item.Country);
            AccName = AccName.concat(item);
        }
    });
    AccName = AccName.sort(function(a,b){
            if(a.Country < b.Country)
                return -1;
            if(a.Country > b.Country)
                return 1;
            return 0;
        });
    res.render('Country', {
        pageTitle: 'country',
        pageID: "Country",
        Country: AccName,
        Location: "../../",
        current: "Regions"
    });
});

module.exports = router;