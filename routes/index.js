const express = require("express")
const router = express.Router()

const passport = require('passport');
const { isAuth, jwtAuth, vryCookie } = require('../middleware/auth');
const { getUser} = require('../controllers/dashboard');

// USER DASHBOARD USING PASSPORT-LOCAL STRATEGY
router.get("/", (req, res) => {
    console.log(req.cookies);
    res.json({home:"homepage"})
})

router.get("/error", (req, res) => {
    res.json({error:"login failed!"})
})
// protected route
router.get("/test", isAuth, getUser)

// JWT AUTH protected route

router.get("/jwt-test", vryCookie,  jwtAuth, getUser)

module.exports = router