const User = require("../models/User");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");

const router = require ("express").Router();


//UPDATE 
 router.put("/:id", verifyTokenAndAuth, async (req, res)=>{
    if(req.body.password){
        req.body.password= CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString();//encrypting with AES pass encryption algorithm
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            }, 
            {new:true}
            );
            res.status(200).json(updatedUser);
        //this method takes somethnig as a first parameter and updates it by the second (specific mongo function)
    }catch(err){
        res.status(500).json(err)};
}); 

//DELETE
router.delete("/:id", verifyTokenAndAuth, async (req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER (Only admin)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;//omits password, returns "other" fields
        res.status(200).json(others);//otherwise, send the user as a json object 
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USERS (Only admin)
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();//if there is a "new" query, return only 1 newest user, otherwise return all 
        res.status(200).json(users); 
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER STATS (Only admin)
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();
        res.status(200).json(users); 
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;