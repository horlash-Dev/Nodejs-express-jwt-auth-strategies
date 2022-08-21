// BACKEND  PACKAGES
const express = require("express")
const app = express()
const expressSession = require('express-session')
const expressVal = require('express-validator')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const env = require('dotenv').config()
const cors = require('cors')
const morgan = require("morgan")
const passport = require("passport")

const allRoutes = require("./routes")
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

app.use(expressSession({
    secret: process.env.CS_SESSION,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    cookie: {maxAge: 3600000}
}))

app.use(credentials)
app.use(cors(corsOptions))

app.use(morgan('dev'))
app.use(express.json())

// ROUTES 
app.use(allRoutes)
app.get("/", (req, res) => {
    // this is testing for express-session only
 //const lt =  req.session
    res.json("wwww")
})
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
