const passport = require('passport');
const passportLocal = require('passport-local');

const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');

const authVerify = async (username,password,cb) => {
    try {
        const authUser = await User.findOne({username: username}).exec()
       
        if(!authUser) return cb(null, false, {message: "Incorrect User Details"})
       const compare = await  bcrypt.compare(password, authUser.pass)
      
       if(!compare) return cb(null, false, {message: "Incorrect User Password!"})
       return cb(null,authUser) 
    } catch (error) {
       return cb(error)
    }


}

const auth_strategy = new passportLocal(authVerify)
passport.use(auth_strategy)

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  })
