const router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt');
const UserPost = require('../models/UserPost');
const Comments = require('../models/Comments');


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

// @desc    GET a single post by id
// @route   GET /posts/:id
// @access  PUBLIC
router.get('/posts/:id', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await UserPost.findById(postId).populate('user');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
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
    const newPost = await UserPost.create({
      user: userId,
      title: postTitle,
      message: postMessage,
      media: media
    });
    res.status(201).json({newPost});
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

// @desc    CREATE comment to post
// @route   POST /posts/:postId/comments
// @access  Private
router.post('/posts/:postId/comments', isAuthenticated, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.payload._id;
    const message = req.body.message;

    // Check if the post exists
    const post = await UserPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create comment
    const newComment = new Comments({
      post: postId,
      user: userId,
      message: message
    });

    // Save comment
    await newComment.save();

    res.status(201).json({ message: 'Comment created successfully', comments: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating comments' });
  }
});

// @desc    UPDATE comment
// @route   PUT /posts/:postId/comments/:commentId
// @access  Private
// router.put('/posts/:postId/comments/:commentId', isAuthenticated, async (req, res, next) => {
//   try {
//     const postId = req.params.postId;
//     const commentId = req.params.commentId;
//     const userId = req.payload._id;

//     const post = await UserPost.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const comment = await Comments.findById(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     if (comment.user.toString() !== userId) {
//       return res.status(403).json({ message: 'Unauthorized to update this comment' });
//     }

//     const updatedComment = await Comments.findByIdAndUpdate(commentId, req.body, { new: true });

//     res.status(200).json(updatedComment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating comment' });
//   }
// });

// @desc    DELETE comment
// @route   DELETE /posts/:postId/comments/:commentId
// @access  Private
// router.delete('/posts/:postId/comments/:commentId', isAuthenticated, async (req, res, next) => {
//   try {
//     const postId = req.params.postId;
//     const commentId = req.params.commentId;
//     const userId = req.payload._id;

//     const post = await UserPost.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const comment = await Comments.findById(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     if (comment.user.toString() !== userId) {
//       return res.status(403).json({ message: 'Unauthorized to delete this comment' });
//     }

//     await Comments.findByIdAndDelete(commentId);

//     res.status(200).json({ message: 'Comment deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting comment' });
//   }
// });



module.exports = router;



