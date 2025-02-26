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
    let admin = await Admin.findOne({ username });

    if (admin) {
      return res.status(400).json({
        success: false,
        message: "Please try again with a different username",
      });
    }

    // ✅ Fix: Hashing password should be outside the `if` block
    const securePassword = await bcrypt.hash(password, 10);

    // ✅ Create new admin and save to the database
    const newAdmin = new Admin({
      username,
      password: securePassword,
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin signup successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await Admin.findOne({ username });

    if (!admin) {
      return res
        .status(400)
        .json({
          sucess: false,
          message: "Please tyr with some different name",
        });
    }

    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword)
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid Credential" });

         // ✅ Generate JWT token

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      sucess: true,
      message: "Admin logged in sucessfully",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Please try again with a different username",
    });
  }
};

module.exports = { signup, login, adminSignup, adminLogin };
