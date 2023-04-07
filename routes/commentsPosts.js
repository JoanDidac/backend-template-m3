const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt');
const Comment = require('../models/Comments');

// @desc    CREATE comment
// @route   POST /comments/:postId
// @access  Private
router.post('/:postId', isAuthenticated, async (req, res, next) => {
  console.log('Creating')
  try {
    const commentData = {
      post: req.params.postId,
      user: req.payload._id,
      message: req.body.message
    };

    const comment = await Comment.create(commentData);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
});

// @desc    GET all comments for a specific post
// @route   GET /comments/:postId
// @access  Private
router.get('/:postId', isAuthenticated, async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });

    if (!comments) {
      return res.status(404).json({ message: 'Comments not found for this post' });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments for post' });
  }
});

// @desc    DELETE a comment by ID
// @route   DELETE /comments/:commentId
// @access  Private
router.delete('/:commentId', isAuthenticated, async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// @desc    UPDATE a comment by ID
// @route   PUT /comments/:commentId
// @access  Private
router.put('/:commentId', isAuthenticated, async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { message: req.body.message },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

module.exports = router;
