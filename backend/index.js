const express = require('express');
const app = express();
const allroutes = require('./routes/AllRoutes');
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// end point for feedback
app.use('/api', allroutes);

// main route
app.use('/', async(req, res) => {
    res.send("welcome to KMIT");
});



// Connect to the database
let db = async () => {
    try {
        await mongoose.connect(process.env.DBURI);
        console.log("Connected to the database");
    } catch (err) {
        console.log("Error connecting to the database", err.message);
    }
};
db();



// Start the server
app.listen(5000,()=>{
    console.log("Backend is running at port http://localhost:5000")
})