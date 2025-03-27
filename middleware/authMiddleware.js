const jwt = require("jsonwebtoken");

// Middleware to protect routes and get user info from token
const protect = (req, res, next) => {
  
  // Checks if the Authorization header is present and follows the "Bearer <token>" format.
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" }); // Token not found
  }

  // Extracts the actual token after "Bearer"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret key
    req.user = decoded; // Attach the decoded user data to the request object (including user _id)
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid token or expired token" }); // Handle invalid token
  }

};

// Middleware to check if the user has the required roles
// const authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     // Check if the logged-in user has one of the roles specified in the 'roles' array
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied, insufficient permissions" }); // Deny access if the role is not allowed
//     }
//     next(); // User has the required role, proceed to the next middleware or route handler
//   };
// };

module.exports = { protect };
