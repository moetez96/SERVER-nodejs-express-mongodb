var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

/* GET contact DB. */
router.get('/', function (req, res, next) {
    Contact.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {users: data})
        }
    });
});
/* GET Form add new contact. */
router.get('/add/contact', function (req, res, next) {
    res.render('add')
});
/* GET 1 contact */
router.get('/:id', function (req, res, next) {
    Contact.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render('detail', {user: data})
        }
    });
});
/* GET 1 contact for update */
router.get('/edit/:id', function (req, res, next) {
    Contact.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render('editContact', {user: data})
        }
    });
});
/* POST 2*/
router.post('/add', function (req, res, next) {
    new Contact(
        {
            FullName: req.body.fullname,
            Phone: req.body.phone
        }
    ).save();
    res.redirect("/");
});
/* Update Contact */
router.post('/edit/contact/:id', function (req, res, next) {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);

    const myNewContact = {
        FullName: obj.fullname,
        Phone: obj.phone
    }
    Contact.findByIdAndUpdate(req.params.id, myNewContact, function (err) {
        if (err) {
            res.redirect('/edit/contact/' + res.params.id);
        } else {
            res.redirect('/');
        }
    });
});
/* Delete contact*/
router.get('/delete/:id', function (req, res, next) {
    Contact.findByIdAndRemove(req.params.id,
        function (err, docs) {
            if (err)
                console.log(err);
            res.redirect('/');
        })
})
module.exports = router;
