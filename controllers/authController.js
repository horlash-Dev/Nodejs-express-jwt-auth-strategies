const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');

const register = async (req, res) => {
    const { username, phone, pass} = req.body.data
    const hash = await bcrypt.hash(pass,8)
    if(!hash) return res.sendStatus(500)
    // save user 
    const user = new User({
        username: username,
        phone: phone,
        pass: hash
    }).save((err, user) => {
        if(err) return res.status(500).json({error: err.message})
        res.status(200).json({user, sucess: true})
    })
}

const login =  passport.authenticate('local', {
    successReturnToOrRedirect: '/test',
    failureRedirect: '/error',
    failureMessage: true
    
  })

const logOut = (req, res) => {
    req.logout((err) => {
        if(err) res.sendStatus(500)
        res.status(201).json({sucess: true})
    })
}

module.exports = {
    register,login, logOut
}