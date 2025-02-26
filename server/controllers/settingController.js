const bcrypt = require("bcrypt");
const { ROLES } = require("../utils/constants");
const Admin = require("../models/Admin");

const changeUsername = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { previousUsername, newUsername } = req.body;

    if (!newUsername) {
      return res.status(400).json({
        success: false,
        message: "New username is required",
      });
    }

    const user = await Admin.findOneAndUpdate(
      { username: previousUsername },
      { username: newUsername },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Username does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Username updated successfully to ${user.username}`,
      user: {
        username: user.username,
        role: user.role, // Fixed `user.user.role`
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  if (req.role !== ROLES.admin) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const { username, previousPassword, newPassword } = req.body;

    if (!previousPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Previous and new passwords are required",
      });
    }

    let user = await Admin.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(previousPassword, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Previous password is incorrect",
      });
    }

    // Hash new password
    const securePassword = await bcrypt.hash(newPassword, 10);
    user.password = securePassword;
    
    // Save updated password to DB
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { changeUsername, changePassword };
