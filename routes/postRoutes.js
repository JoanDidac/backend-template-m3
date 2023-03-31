const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt');
const UserPost = require('../models/UserPost');


// @desc    GET all posts
// @route   GET /posts
// @access  PUBLIC!!!
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await UserPost.find().populate('user');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});


// @desc    CREATE POST with media
// @route   POST /posts
// @access  Private
router.post('/posts', isAuthenticated , async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const postTitle = req.body.title;
    const postMessage = req.body.message;
    const media = req.body.media;

    const newPost = new UserPost({
      user: userId,
      title: postTitle,
      message: postMessage,
      media: media
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created with media successfully ✓' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post with media pal 🤬' });
  }
});

// @desc    UPDATE POST by ID
// @route   PUT /posts/:id
// @access  Private
router.put('/posts/:id', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.payload._id;

    const post = await UserPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this post' });
    }

    const updatedPost = await UserPost.findByIdAndUpdate(postId, req.body, { new: true });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
});


// @desc    DELETE POST by ID
// @route   DELETE /posts/:id
// @access  Private
// Owner of the post's id must be the same as the current user's id in req.payload

router.delete('/posts/:id', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.payload._id;

    const post = await UserPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await UserPost.findByIdAndDelete(postId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});



module.exports = router;



