const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');
const JWTtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
//local strategy for local and jwt (signup)
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


// JWT AUTH ACTION CODE and login code
const readPriv = {key: fs.readFileSync(path.join(__dirname, "..", "config", "priv_key.rem"), "utf-8"), passphrase: "app.key"}

const jwtLogin =  async (req, res) => {
    try {
        const { username, password} = req.body
        const getUser = await User.findOne({username: username}).exec()
        if(!getUser) return res.sendStatus(401)
        const compare = await  bcrypt.compare(password, getUser.pass)
        if(!compare) return res.sendStatus(401)
        // sign token
        let name = getUser.username
        const signToken = JWTtoken.sign({ aud: name, iss: "localhost" }, readPriv, {algorithm: 'RS256', expiresIn: "1h" }, (err, token) => {
        
            if(err) return res.sendStatus(500)
            res.cookie('auth_token', token, { httpOnly: true, maxAge: 1000})
            res.status(200).json({token, user: getUser})
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const jwtLogout = (req, res) => {

    res.clearCookie("auth_token",{httpOnly: true})
    res.redirect("/")
}

module.exports = {
    register,login, logOut, jwtLogin, jwtLogout
}