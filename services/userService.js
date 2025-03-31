// services/userService.js

const User = require('../models/User');

// Create a new user
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Get user by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

// Update user
const updateUser = async (userId, updatedData) => {
  return await User.findByIdAndUpdate(userId, updatedData, { new: true });
};

// Get all users (if needed)
const getAllUsers = async () => {
  return await User.find();
};

// Get user with details
const getUserWithDetails = async (userId) => {
    const user = await User.findById(userId)
      .populate('workExperience')
      .populate('projects')
      .populate('skills')
      .populate('volunteerWork')
      .populate('technicalKnowledge')
    return user;
    };

module.exports = {
  createUser,
  getUserById,
  updateUser,
  getAllUsers,
  getUserWithDetails
};
