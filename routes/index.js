/**
 * Created by Brecht on 6/11/2015.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('landing', { title: 'Express' });
});

module.exports = router;