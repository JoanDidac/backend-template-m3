// COMMENTS of the USER POSTSconst router = require('express').Router();
const { isAuthenticated } = require('../middlewares/jwt');
const Comment = require('../models/Comment');


// @desc    CREATE comment
// @route   POST /posts/:postId/comments
// @access  Private


module.exports = router;
