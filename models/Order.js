const mongoose = require("mongoose");
//this creates the fields in which a User is composed of.

const OrderSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        products:
        [
            {
                productId:{type:String},
            },
        ],
        amount:{type:Number, required:true},
        address:{type:Object, required:true},
        status:{type:String, default:"pending"},
    },
    { timestamps:true }
);

module.exports = mongoose.model("Order", OrderSchema);