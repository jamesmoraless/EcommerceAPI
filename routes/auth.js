//creating another route i.e. auth allows for a more robust application
const router = require ("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res)=>{
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),//encrypting with AES pass encryption algorithm
    });//creating a model object
    
    try{
    const savedUser = await newUser.save()//saving newUser to my DB with await (meaning its an async function)
    res.status(200).json(savedUser);
    }catch (err){
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});//find a user in the DB
        !user && res.status(401).json("No Account Under That Username Found!");//check if a user was found 

        const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const OriginalPass = hashedPass.toString(CryptoJS.enc.Utf8);//decrypt the encrypted password 

        OriginalPass !== req.body.password && 
            res.status(401).json("Incorrect Password");//if the passed password doesnt match the decrypted password throw an err

        const accessToken = jwt.sign({//json web token is used to verify users and admins by matching object id to admin and user id's 
            id:user.id,
            isAdmin:user.isAdmin,
        },
            process.env.JWT_SEC, {expiresIn: "3d"}//cant login after 3days 
        );

        const { password, ...others } = user._doc;//omits password, returns "other" fields
        res.status(200).json({...others, accessToken});//otherwise, send the user as a json object 


    }catch(err){
        res.status(500).json(err);
    } 
});


module.exports = router;