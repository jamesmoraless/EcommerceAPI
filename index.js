const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL
).then(()=> console.log("DB connection succesful.")).catch((err)=> console.log(err));//since its a promise, we want it to confirm to us
const PORT = 5000;



app.listen(process.env.PORT || PORT, ()=> {
    console.log("Backend server is running onn port: " + PORT);
});