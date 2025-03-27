const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const SECRET_KEY = process.env.JWT_SECRET; 

const generateToken = (user) => {
    return jwt.sign({ 
        id: user._id, 
        email: user.email,
     
    }, SECRET_KEY, {
        expiresIn:'1h'
    });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present and in the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
      // Verify and decode the token
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = { id: decoded.id };  // Attach user ID to the request object
      next();  // Proceed to the next middleware or route handler
  } catch (error) {
      console.error("Token verification failed:", error.message);
      return res.status(401).json({ message: "Unauthorized, invalid or expired token" });
  }
};


module.exports = {
    generateToken,
    verifyToken
}