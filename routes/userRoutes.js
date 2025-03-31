// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have middleware to extract userId from JWT


// Create user
router.post('/user/create', userController.createUser);

// Get user by ID
router.get('/user/:id', userController.getUserById);

// Update user
router.put('/user/:id', userController.updateUser);

// Get all users (optional)
router.get('/users', userController.getAllUsers);

// Get all information
router.get('/get-user-data', protect, userController.getWorkExperienceByUser);


module.exports = router;
