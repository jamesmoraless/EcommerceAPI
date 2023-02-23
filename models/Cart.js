const mongoose = require("mongoose");
//this creates the fields in which a User is composed of.

const CartSchema = new mongoose.Schema(
    {
        userId:{type:String, required:true},
        products:
        [
            {
                productId:{type:String},
            }
        ],
    },
    { timestamps:true }
);

module.exports = mongoose.model("Cart", CartSchema);