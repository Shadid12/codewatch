const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    email:    {type: String, unique:true},
    password: {type: String, default: ''}
});

module.exports = mongoose.model('User', userSchema);