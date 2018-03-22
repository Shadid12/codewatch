'use strict';
const passport = require('passport');

module.exports = function(_){
    
    return{
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.post('/signup', this.postSignUp);
        },
        
        indexPage: function(req, res){
            return res.render('index', {test:'hello there'});
        },
        
        getSignUp: function(req, res){
            return res.render('signup');
        },

        postSignUp: passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/signup',
            failureFlash:    true
        })
    }
}