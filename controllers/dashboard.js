//user dashboard for auth (protected route)
const getUser = async (req, res) => {
    return res.status(200).json({user: req.user, succes:true})
 }

//		res.cookie('auth_token', refToken, { httpOnly: true, secure: true, maxAge: 1 * 60 * 60  * 1000})
 module.exports = { getUser }