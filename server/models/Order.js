const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
amount:{
    type:Number,
    required:true,

},
address:{
    type:String,
    required:true,
},
razorpayPaymentID:{
    type:String,
    required:true,
},
razorpaySignature:{
    type:String,
    required:true,
},
products:[

    {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
        },
        quantity:{
            type:Number,
            require:true,
        },
        color: {
            type:String,
            required:false,
        },
    }
],
 userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
 },
 status:{
    type:String,
    enum:["Pending","Packed", "Completed", "failed"],
    default:"Pending",
 },


},
{timestamps:true}

)

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;