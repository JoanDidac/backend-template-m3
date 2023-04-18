const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/jwt');
const Like = require('../models/Like');

// @desc    Get like status for a specific post and user
// @route   GET /likes/status/:postId
// @access  Private
router.get('/status/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const postId = req.params.postId;

    const like = await Like.findOne({ post: postId, username: userId });

    if (like) {
      res.status(200).json({ liked: true });
    } else {
      res.status(200).json({ liked: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting like status' });
  }
});



// @desc    CREATE NEW like
// @route   POST /likes
// @access  Private
router.post('/', isAuthenticated, async (req, res, next) => {
    try {
      const likeData = {
        post: req.body.post,
        username: req.payload._id
      };
  
      // Check if the user has already liked the drone by ID!
      const existingLike = await Like.findOne(likeData);
      if (existingLike) {
        return res.status(200).json({ message: 'You have already liked this post' });
      }
  
      const like = await Like.create(likeData);
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ message: 'Error creating like' });
    }
  });
  
  

// @desc    DELETE a like by ID
// @route   DELETE /likes/:id
// @access  Private
router.delete('/:id', isAuthenticated, async (req, res, next) => {
    try {
      const like = await Like.findByIdAndDelete(req.params.id);
  
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
  
      res.status(200).json({ message: 'Like deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting like' });
    }
  });
  

// @desc    GET all likes for a specific drone
// @route   GET /likes/drone/:droneId
// @access  Private
router.get('/drone/:droneId', isAuthenticated, async (req, res, next) => {
    try {
      const likes = await Like.find({ drone: req.params.droneId });
  
      if (!likes) {
        return res.status(404).json({ message: 'Likes not found for this drone' });
      }
  
      res.status(200).json(likes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching likes for drone' });
    }
  });
  

module.exports = router;
