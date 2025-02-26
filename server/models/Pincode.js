const mongoose = require("mongoose");

const pincodeSchema = new mongoose.Schema(  // ✅ Use 'new' for clarity
  {
    pincode: {
      type: String,
      required: true,
      unique: true,
      trim: true,  // ✅ Removes unnecessary spaces
    },
  },
  { timestamps: true }
);

const Pincode = mongoose.model("Pincode", pincodeSchema); // ✅ Corrected model creation
module.exports = Pincode;
