const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false, 
      message: "Unauthorized request", 
    });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.id = decoded.id;
    req.role = decoded.role;
    
    next();
  } catch (error) {
    return res.status(400).json({
      success: false, // ✅ Fixed spelling
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;
