//creating another route i.e. auth allows for a more robust application
const router = require ("express").Router();
const User = require("../models/User");

//Register
router.post("/register", async (req, res)=>{
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });//creating a model object
    try{
    const savedUser = await newUser.save()//saving newUser to my DB with await (meaning its an async function)
    res.status(200).json(savedUser);
    }catch (err){res.status(500).json(err)}
})


module.exports = router;