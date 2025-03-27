// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create user
router.post('/user', userController.createUser);

// Get user by ID
router.get('/user/:id', userController.getUserById);

// Update user
router.put('/user/:id', userController.updateUser);

// Get all users (optional)
router.get('/users', userController.getAllUsers);

module.exports = router;
