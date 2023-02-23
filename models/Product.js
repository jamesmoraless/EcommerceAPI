const mongoose = require("mongoose");
//this creates the fields in which a User is composed of.

const ProductSchema = new mongoose.Schema(
    {
        title:{type:String, required:true, unique:true},
        desc:{type:String, required:true},
        image:{type:String, required:true},
        categories:{type:Array, default:false},
        size:{type:String },
        price:{type:Number, required:true}
    },
    { timestamps:true }
);

module.exports = mongoose.model("Product", ProductSchema);