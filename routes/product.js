const Product = require("../models/Product");
const router = require ("express").Router();
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require("./verifyToken");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
        
    }
})


//UPDATE 
router.put("/:id", verifyTokenAndAdmin, async (req, res)=>{

    try{
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            }, 
            {new:true}
            );
            res.status(200).json(updatedProduct);
        //this method takes somethnig as a first parameter and updates it by the second (specific mongo function)
    }catch(err){
        res.status(500).json(err)};
}); 

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET PRODUCT (for everyone)
router.get("/find/:id", async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);//otherwise, send the user as a json object 
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL PRODUCTS (for everyone)
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(1) : await User.find();//if there is a "new" query, return only 5 newest users, otherwise return all 
        res.status(200).json(users); 
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER STATS (Only admin)
//total #of users per month... will add to this to make it deeper (i.e. revenue, etc)
router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear} } },
            {$project:{
                month: {$month: "$createdAt"},
            },
        },
        {
            $group:{
                _id:"$month",
                total:{$sum: 1},
            },
        },
        ]);//
        
        res.status(200).json(data); 
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;