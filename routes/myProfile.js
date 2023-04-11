const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/jwt');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// @desc    GET My Profile
// @route   GET /myprofile
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});



/// @desc    UPDATE My Profile
// @route   PUT /myprofile
// @access  Private
router.put('/', isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.payload._id;
      const { email, username, password } = req.body;
      let updateData = { email, username };
  
      // If the password field is not empty, hash the new password
      if (password && password !== "") {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        updateData.password = hashedPassword;
      }
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Remove the hashedPassword from the response
      const userData = updatedUser.toObject();
      delete userData.hashedPassword;
  
      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      console.error("Error updating user profile:", error); // Add this line for error logging
      res.status(500).json({ message: 'Error updating user profile' });
    }
  });
  

  

module.exports = router;
