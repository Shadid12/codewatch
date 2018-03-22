'use strict';

const passport      = require('passport');
const User          = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    User.findOne({'email': email}, (err, user) => {
        if(err){
            console.log(err);
            return done(err)
        }
        if(user){
            return done(null, false, req.send({error: err}));
        }

        const newUser = new User();
        newUser.email = req.body.email;
        newUser.password = req.body.password;

        newUser.save((err) => {
            done(null, newUser);
        });
    })

}));