const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(process.env.MONGO_URL//for security, we are using a virtual env
).then(()=> console.log("DB connection succesful.")).catch((err)=> console.log(err));//since its a promise, we want it to confirm to us
const PORT = 5000;
app.use(express.json());

//creating endpoint that uses a user route file for better organization
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);




app.listen(process.env.PORT || PORT, ()=> {
    console.log("Backend server is running on port: " + PORT);
});