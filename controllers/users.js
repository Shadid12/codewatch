'use strict';

module.exports = function(_){
    
    return{
        SetRouting: function(router){
            router.get('/', this.indexPage);
        },
        
        indexPage: function(req, res){
            return res.render('index', {test:'hello there'});
        },
        getSignUp: function(req, res){
            return res.render('signup');
        }
    }
}