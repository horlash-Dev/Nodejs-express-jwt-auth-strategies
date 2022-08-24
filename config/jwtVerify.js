const passport = require('passport');
const passportJwt = require('passport-jwt').Strategy
const passportExrt = require('passport-jwt').ExtractJwt
const fs = require('fs');
const User = require('../model/UserSchema');

const readPub = fs.readFileSync(__dirname + "/pub_key.rem", "utf-8")

const options = {}
options.jwtFromRequest = passportExrt.fromAuthHeaderAsBearerToken()
options.secretOrKey = readPub
options.algorithms =  ['RS256']

const verify = (jwt_payload, done) => {
    User.findOne({username: jwt_payload.aud}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}
module.exports = passport.use(new passportJwt(options, verify));
