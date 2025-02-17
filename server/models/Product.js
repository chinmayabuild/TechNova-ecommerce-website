const mongoose = requre("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
        name:{
            type:String,
            require:true,
        },
        price: {
            type:Number,
            required:true,
        },
        description:{
            type:true,
            required:true,

        },
        stocks:{
            type:Array,
            required:true,
        },
        images:{
            type:Array,
            required:true,
        },
        rating:{
            type:Number,
            default:5,
        }, 
        reviews:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    colors:{
        type:Array,
        required:true,
    },
    blacklisted:{
        type:Boolean,
        default:false,
    },
    
},
{timestamps:true}
);

productSchema.method.calculateRating = async function() {
    const reviews = await Review.find({productId:this._id});
    if(reviews.length > 0){
        const totalRating = reviews.reduce((acc, review) => acc + review.rating,0)
        this.rating = totalRating/reviews.length;
    } else{
        this.rating = 5;
    }
    await this.save();
}

const Product = mongoose.model("Product", productSchema);