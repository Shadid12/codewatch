'use strict'

module.exports = function() {
    return {
        SignUpValidation: (req, res, next) => {
            req.checkBody('username', 'username must not be empty').notEmpty();
            req.checkBody('email', 'email must not be empty').notEmpty();
            req.checkBody('password', 'password must not be empty').notEmpty();
            req.checkBody('email', 'must be a valid email').isEmail();
        
            req.getValidationResult()
                .then((result) => {
                    const errors = result.array();
                    const messages = [];
                    errors.forEach(error => {
                        messages.push(error);
                    });
                    req.flash('error', messages);
                }).catch((err) => {
                    console.log(err);
                    return next();
                })
        }
    }
}