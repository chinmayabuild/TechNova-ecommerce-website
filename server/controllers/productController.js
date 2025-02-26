const { ROLES } = require("../utils/constants");
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");



const createProduct = async (req, res) => {
  // Check if the user is an admin
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { name, price, description, stock, colors, category } = req.body;

    // Upload images to Cloudinary
    const uploadedImages = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });

      uploadedImages.push({
        url: result.secure_url,
        id: result.public_id,
      });
    }

    // Create a new product
    const product = new Product({
      name,
      price,
      description,
      stock,
      colors,
      category,
      images: uploadedImages,
    });

    // Save product to the database
    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { ...data } = req.body;
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found", data: null });

    return res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    let { page, limit, category, price, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 9;

    let query = {};

    if (category)
      query.category = category.charAt(0).toUpperCase() + category.slice(1);
    if (category == "all") delete query.category;

    if (search) query.name = { $regex: search, $options: "i" };

    if (price > 0) query.price = { $lte: price };

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(query)
  .select("name price images ratings description blacklisted")
  .skip((page - 1) * limit)
  .limit(limit);

    let newProductsArray = [];
    products.forEach((product) => {
      const productObj = product.toObject();
      productObj.image = productObj.images[0].url;
      delete productObj.images;
      newProductsArray.push(productObj);
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Product found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product fectched successfully",
      pagination: {
        totalProducts,
        totalPages,
        currentpage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ name });

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    return res
      .status(200)
      .json({ success: true, message: "Product found", data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const blacklistProduct = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { blacklisted: true },
      { new: true }
    );

    if(!product) return res.status(404).json({ success:false, message:"Product not Found"});

    return res.status(200).json({
      success: true,
      message: `The product ${product.name} has been blacklisted`,
      data: product,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromBlacklist  = async (req, res) =>{

  if (req.role !== ROLES.admin) {
    return res.status(401).json({success: false, message:"Access denied"})
  }

  const { id } = req.params;

  try{

    const product = await Product.findByIdAndUpdate(id, {blacklisted:false}, {new:true});

     if (!product)  return res.status(404).json({success:false, message:"Product not Found"});

     return res.status(200).json({success:true, message:`The product ${product.name} has been removed from the blacklisted`});

  } catch(error){
    return res.status(500).json({success:false, message:error.message})
  }
}

module.exports = {createProduct, updateProduct, deleteProduct, getProducts, getProductByName, blacklistProduct, removeFromBlacklist};
