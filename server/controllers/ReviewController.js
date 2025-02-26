const Product = require("../models/Product");
const Review = require("../models/Review");
const { ROLES } = require("../utils/constants");

const createReview = async (req, res) => {
  if (req.role !== ROLES.user) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  const userId = req.id;
  try {
    const { productId, review, rating } = req.body;
    const newReview = await Review.create({
      productId,
      review,
      userId,
      rating,
    });
    // Create a new review
    await newReview.populate("userId", "name");

    // Populate user details

    let product = await Product.findByIdAndUpdate(productId, {
      $push: { reviews: newReview._id },
    });

    // Update the product's reviews array
    await product.calculateRatings();

    return res.status(201).json({
      success: true,
      message: "Thanks for the Review",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateReview = async (req, res) => {
  if (req.role !== ROLES.user) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { id } = req.params;
    const { updatedReview } = req.body;

    // Validate input
    if (!updatedReview) {
      return res
        .status(400)
        .json({ success: false, message: "Updated review text is required" });
    }

    // Find and update the review
    let review = await Review.findByIdAndUpdate(
      id,
      { review: updatedReview },
      { new: true }
    );

    // If review is not found
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    // Populate user details
    await review.populate("userId", "name");

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const replyReview = async (req, res) => {
  if (req.role !== ROLES.user) {
    return res.status(401).json({ success: false, message: "Access denieed" });
  }

  const userId = req.id;
  const { id } = req.params;

  try {
    const { review } = req.body;
    let foundReview = await Review.findByIdAndUpdate(
      { _id: id },
      { $push: { replies: { userId, review } } },
      { new: true }
    )
      .populate("replies.userId", "name")
      .populate("userId", "name");

    if (!foundReview) {
      return res
        .status(404)
        .json({ success: false, message: "review not found" });
    }

    return res.status(200).json({
        success: true,
        message: "Replay added sucessfuly",
        data: foundReview,
      });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReview  = async(req, res) => {
    if (req.role !== ROLES.user) {
        return res.status(401).json({ success: false, message: "Access denieed" });
      }


      try {

        const { id } = req.params;
     
        let review = await Review.findByIdAndDelete (id);
         
    
        if (!review) {
          return res
            .status(404)
            .json({ success: false, message: "review not found" });
        }

        let product = await Product.findByIdAndUpdate(review.productId, {
            $pull:{reviews:review._id},
        });

        await product .calculateRatings()


        
        if (!review) {
            return res
              .status(404)
              .json({ success: false, message: "review not found" });
          }
    
        return res.status(200).json({
            success: true,
            message: "review deleted",
          });


    
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
}


const getReviews = async(req, res) => {

    try{
        const { id } = req.params;
        let reviews = await Review.find({productId:id}).populate({
            path:"userid",
            select:"name",
            })
            .populate({
                path:"replies.userId",
                select:"name",
            });
    if(!reviews) {
      return res.status(404).json({success:false, message:"Review not Found"})
    }
     
    return res.status(200).json({success:true, data:reviews, message:"Review found"});


    } catch(error){
      return res.status(500).json({success:false, message:error.message});
    }

}

module.exports = {createReview, updateReview, replyReview, deleteReview, getReviews};

