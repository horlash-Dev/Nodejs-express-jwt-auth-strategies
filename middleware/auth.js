exports.isAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
       return next()
    }
    res.status(200).redirect('/')
}