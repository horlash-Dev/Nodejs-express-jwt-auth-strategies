// for jwt-auth only
const passport = require('passport');
// local strategy
exports.isAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
       return next()
    }
    res.status(200).redirect('/')
}

// passport jwt middleware only
exports.vryCookie = async (req, res, next) => {
    if(!req.cookies?.auth_token && !req.user) return res.sendStatus(401)
    return next()
 }

exports.jwtAuth = passport.authenticate('jwt', { session: false })