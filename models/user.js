const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    email:    {type: String, unique:true},
    password: {type: String, default: ''}
});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
}

userSchema.methods.validUserPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);