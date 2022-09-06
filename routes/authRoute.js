const express = require("express")

const router = express.Router()
// passport-local- route
const { register, login, logOut} = require('../controllers/authController');
router.post("/register", register)
router.post("/login", login)
router.get("/logout", logOut)
module.exports = router