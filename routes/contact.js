var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

/* GET contact DB. */
router.get('/', function (req, res, next) {
    Contact.find(function (err, data) {
        res.json(data);
    });
});
/* POST */
router.post('/', function (req, res, next) {
    var user = new Contact(
        {FullName: "Moetez Ayari", Phone: 98000000}
    );
    user.save();
    res.send("Added");
});
/* POST 2*/
router.post('/add', function (req, res, next) {
    new Contact(
        {
            FullName: req.body.FullName,
            Phone: req.body.Phone
        }
    ).save();
    res.send("Added");
});
/* Delete contact*/
router.post('/delete/:id', function (req, res, next) {
    Contact.findByIdAndRemove(req.params.id,
        function (err, docs) {
            if (err)
                console.log(err);
            res.send("contact deleted");
        })
})
module.exports = router;
