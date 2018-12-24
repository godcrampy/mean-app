var jwtStrategy = require('passport-jwt').Strategy
    ExtractJwt = require('passport-jwt').ExtractJwt
    User = require('../models/user')
    config = require('../config/database')

module.exports = function (passport) {
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
    opts.secretOrKey = config.secret
    passport.use(new jwtStrategy(opts, (jwt_payload, done) =>{
        // console.log(jwt_payload)
        User.getUserById(jwt_payload.user._id, (err, user)=>{
            if (err){
                return done(err, false)
            }
            if (user){
                return done(null, user)
            }
            else{
                return done(null, false)
            }
        })
    }))
}