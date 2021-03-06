const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
// create express app
const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to RentVroom Car Booking Web!!" });
});

// app.use(express.static('public'))
require('./app/routes/car.routes')(app);
app.listen(process.env.PORT || 8080, () => console.log("ALL OK!!! Server is listening on port 8080!"))