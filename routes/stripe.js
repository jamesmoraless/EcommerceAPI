const router = require("express").Router();
const stripe = requie("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,//stripe returns a tokenId
        amount:req.body.amount,
        currency:"cad",
    }, (stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).send(stripeErr);
        }
        else{
            res.status(200).json(stripeRes);
        }
    })
})


module.exports = router;