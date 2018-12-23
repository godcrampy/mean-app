var mongoose = require('mongoose')
    bcrypt = require('bcryptjs')
    config = require('../config/database')

const UserSchema = mongoose.Schema({
    name : {type : String},
    email: {type: String, required : true},
    username: {type: String, required : true},
    password: {type: String, required : true}
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = function(id, callback){
    User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback){
    User.findOne({username : username}, callback)
}

module.exports.addUser = function(newUser , callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if (err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
}