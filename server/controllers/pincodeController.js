const Pincode = require("../models/Pincode");
const {ROLES}  = require("../utils/constants");

const addPincode = async (req, res) => {

  if (req.role !== ROLES.admin) {
    return res.status(401).json({
      success: false,
      message: "Access denied",
    });
  }

  const { pincodes } = req.body;

  if (!pincodes || pincodes.length === 0) {
    return res.status(400).json({ success: false, message: "Please provide pincodes" });
  }

  try {
    // ✅ Find already existing pincodes in the database
    const existingPincodes = await Pincode.find({
      pincode: { $in: pincodes.map((p) => p.pincode) },
    });

    // ✅ Extract existing pincode values (not entire objects)
    const existingPincodeValues = existingPincodes.map((p) => p.pincode);

    // ✅ Filter new pincodes that are not in the database
    const newPincodes = pincodes.filter(
      (p) => !existingPincodeValues.includes(p.pincode)
    );

    if (newPincodes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All provided pincodes already exist",
      });
    }

    // ✅ Insert new pincodes into the database
    await Pincode.insertMany(newPincodes);

    return res.status(200).json({
      success: true,
      message: "Pincodes added successfully",
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPincode = async (req, res) => {
  const { pincode } = req.params; // Corrected destructuring

  try {
    const existingPincode = await Pincode.find({ pincode }); // Corrected await syntax

    if (existingPincode.length === 0) { // Corrected condition
      return res.status(404).json({
        success: false,
        message: "No delivery available for this product",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Delivery available",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addPincode,getPincode };
