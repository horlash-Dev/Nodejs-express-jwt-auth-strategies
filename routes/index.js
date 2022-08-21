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

router.get("/test", isAuth, getUser)

//     // this is testing for express-session only
//     // dssfsffssfg
// const user = require("../config/tmp.json")
// router.post("/save", (req, res) => {
//     const { username, pass} = req.body.data
//     if(!pass) res.sendStatus(401)
//     if (!req.session?.user) {
      
        
//         req.session.regenerate((err) => {
//             if(err) res.sendStatus(500)
           
//             req.session.user = user
//             req.session.save((err) => {
//                 if(err) res.sendStatus(200)
//                 res.json({success: true})
//             })
//         })
//     } else { 
//         req.session.regenerate((err) => {
//             if(err) res.sendStatus(200)
            
//             res.json({success: false})
//         })
//     }

// })


module.exports = router