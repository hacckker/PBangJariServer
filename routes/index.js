var express     = require('express');
var router      = express.Router();

var passport    = require('passport');

var Ceo         = require('../models/ceo');


// 중복 로그인을 막기 위한 함수
function isLoggedIn(req, res, next) {
    if(!req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/');
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.passport) {
        Ceo.findById(req.session.passport.user, (err, ceo) => {
            if(ceo.name) res.render('index', {
                ceoName: ceo.name
            });
            else res.render('index', {
                ceoName: ''
            });
        });
    } else res.render('index', {
        ceoName: ''
    });
});

router.get('/home', function(req, res, next) {
    res.render('index');
});

router.get('/auth/kakao', isLoggedIn, passport.authenticate('kakao', {
    successRedirect: '/',       // 성공하면 index로
    failureRedirect: '/fail'    // 실패하면 fail로
}));

router.get('/kakao_oauth', passport.authenticate('kakao', {
    successRedirect: '/',       // 성공하면 index로
    failureRedirect: '/fail'    // 실패하면 fail로
}));

router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy();
    res.render('index', {
        ceoName: ''
    });
});

module.exports = router;
