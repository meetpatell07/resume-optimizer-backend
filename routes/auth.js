const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const router = express.Router();

const { generateToken } = require("../utils/jwtHelper"); // Import the generateToken helper

const bcrypt = require("bcrypt");

const dotenv = require('dotenv');
dotenv.config();


// Authenticate a user and return a JWT (JSON Web Token) if login is successful.
router.post ("/login", async (req, res) => {

    const { email, password } = req.body; // Destructure from request body

    // CHeck is the user exists in database
    const user = await User.findOne({ email });

    if(!user) return res.status(400).send("Invalid username or password");

    // compare with the hashed password
    const validPassword = await bcrypt.compareSync(password, user.password);
    
    if (!validPassword)
      return res.status(400).send("Invalid Email or password.");
  
    // Generate a JWT, userId as payload, sign in with SECRET KEY
    const token = generateToken(user);

    // Send JWT to Client
    // res.send({ token });
    res.status(200).json({
      token,
      user: {
          _id: user._id,
          email: user.email,
      }
  });
})

// User Signup Route
router.post("/signup", async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
          email,
          password: hashedPassword,
      });

      await user.save();

      // Generate JWT token
      const token = generateToken(user);

      // Send response
      res.status(201).json({
          message: "User registered successfully",
          token,
          user: {
              _id: user._id,
              email: user.email,
          },
      });
  } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;