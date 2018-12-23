var express = require("express")
    bodyParser = require("body-parser")
    app = express()
    mongoose = require("mongoose")
    path = require("path")
    cors = require("cors")
    passport = require("passport")
    users = require("./routes/users")
    config = require("./config/database")

    //Connect mongoose to database
    mongoose.connect(config.database)
    mongoose.connection.on('connected', ()=>{
        console.log("connected to database " + config.database)
    })
    mongoose.connection.on('error', (error)=>{
        console.log("Error: " + error)
    })

    //Port Number 
    var port = 3000
    app.listen(port,()=>{console.log("Server started on port " + port) })

    // bodyParser Middleware(must be above cors)
    app.use(bodyParser.json())

    //Corse Middleware
    app.use(cors())

    // Users
    app.use('/users', users)

    //Set static folder(Angular)
app.use(express.static(path.join(__dirname, 'public')))

    

    app.get("/", function (req, res) {
        res.send("Invalid Endpoint")
    })