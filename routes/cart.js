const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");
const router = require ("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res)=>{
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
        
    }
})


//UPDATE 
router.put("/:id", verifyTokenAndAuth, async (req, res)=>{

    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            }, 
            {new:true}
            );
            res.status(200).json(updatedCart);
        //this method takes something as a first parameter and updates it by the second (specific mongo function)
    }catch(err){
        res.status(500).json(err)};
}); 

//DELETE
router.delete("/:id", verifyTokenAndAuth, async (req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER CART (for everyone by user Id)
router.get("/find/:userid", verifyTokenAndAuth, async (req, res)=>{
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);//otherwise, send the user as a json object 
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL (for everyone)
router.get("/", verifyTokenAndAdmin, async (req, res)=>{

    try {
        const carts = await Cart.find();
        res.status(200).json(carts); 
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;