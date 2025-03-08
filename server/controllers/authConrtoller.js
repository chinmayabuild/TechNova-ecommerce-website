const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false, // ✅ Fix: Spelling of "success"
        message: "Please try again with a different email",
      });
    }

    // ✅ Hashing the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Creating a new user instance
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword, // Storing the hashed password
    });

    // ✅ Save the user in the database
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false, // ✅ Fix spelling
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ sucess: false, message: "User not Found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credencial" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      sucess: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

const adminSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Check if admin already exists
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(400).json({
        success: false,
        message: "Username already exists, please try a different username",
      });
    }

    // Hash password
    const securePassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      password: securePassword,
      role: 'admin' // Add default role if applicable
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin signed up successfully",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    // Find admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({
        success: false, // Fixed typo 'sucess'
        message: "Invalid username or password", // More generic message for security
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false, // Fixed typo 'sucess'
        message: "Invalid username or password", // More generic message for security
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true, // Fixed typo 'sucess'
      message: "Admin logged in successfully", // Fixed typo 'sucessfully'
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ // Changed to 500 for server error
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { signup, login, adminSignup, adminLogin };

