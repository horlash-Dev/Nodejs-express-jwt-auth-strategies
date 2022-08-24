const express = require("express")
const router = express.Router()

const passport = require('passport');
const { isAuth, jwtAuth, vryCookie } = require('../middleware/auth');
const { getUser} = require('../controllers/dashboard');

// USER DASHBOARD USING PASSPORT-LOCAL STRATEGY
router.get("/", (req, res) => {
    res.send({home:"homepage"})
})

router.get("/error", (req, res) => {
    res.json({error:"login failed!"})
})
// protect route
router.get("/test", isAuth, getUser)

// JWT AUTH protect route

router.get("/jwt-test", vryCookie,  jwtAuth, getUser)

module.exports = router