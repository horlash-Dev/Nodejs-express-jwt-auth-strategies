const express = require("express")

const router = express.Router()
const { isAuth } = require('../middleware/auth');
const { getUser} = require('../controllers/dashboard');
// USER DASHBOARD USING PASSPORT-LOCAL STRATEGY
router.get("/", (req, res) => {
    res.send({home:"homepage"})
})

router.get("/error", (req, res) => {
    res.json({error:"login failed!"})
})
// route protected
router.get("/test", isAuth, getUser)

module.exports = router