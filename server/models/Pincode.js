const mongoose =require("mongoose");


const pincodeSchema = new Mongoose.Schema(
    {
        pincode:{
            type:String,
            required:true,
            unique:true,
        },
    },
    { timestamps: true}
);

const Pincode = mongoose("Pincode", pincodeSchema);
module.exports = Pincode;