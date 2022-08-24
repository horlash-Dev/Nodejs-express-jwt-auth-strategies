// BACKEND  PACKAGES
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const env = require('dotenv').config()
const cors = require('cors')
const morgan = require("morgan")
const passport = require("passport")
const cookieparser = require('cookie-parser');
const allRoutes = require("./routes")
const authRoutes = require("./routes/authRoute")
//CONNECT DB
const connect = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        throw error.message
    }
}

connect()

// MIDDLEWARES AND CORS
const { logEvent } = require("./config/logger")
const { credentials, corsOptions } = require("./config/credentials")

app.use(logEvent)

app.use(credentials)
app.use(cors(corsOptions))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieparser())

// passport jwt init
require('./config/jwtVerify')
// ROUTES 
app.use(authRoutes)
app.use(allRoutes)

// ERROR HANDLER

app.use((err, req, res, next) => {
    if (err) {
        res.send("FATAL ERROR!")
    }
    console.log(err.message);
    next()
})

// SERVER BOOT

app.listen(process.env.PORT, () => `SERVER STARTED AT ${process.env.PORT}`)
