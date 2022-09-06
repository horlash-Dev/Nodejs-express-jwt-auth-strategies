const express = require("express")

const router = express.Router()
// local auth
const { register, login, logOut, jwtLogin, jwtLogout} = require('../controllers/authController');
router.post("/register", register)
router.post("/login", login)
router.get("/logout", logOut)

// jwt auth action routes

router.post("/jwt-login", jwtLogin)
router.get("/jwt-logout", jwtLogout)
module.exports = router