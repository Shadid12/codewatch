'use strict';
// const passport = require('passport');

module.exports = function(_, passport, User){
    
    return{
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.post('/signup', User.SignUpValidation, this.postSignUp);
            router.get('/login', this.getLogin);
        },
        
        indexPage: function(req, res){
            return res.render('index', {test:'hello there'});
        },
        
        getSignUp: function(req, res){
            const errors = req.flash('error');
            return res.render('signup', {errors: errors, has_errors: errors.length > 0});
        },

        getLogin: function(req, res) {
            const errors = req.flash('error');
            return res.render('login', {errors: errors, has_errors: errors.length > 0});
        },

        postSignUp: passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash:    true
        })
    }
}