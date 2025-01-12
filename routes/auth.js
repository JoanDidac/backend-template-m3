const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');
const saltRounds = 10;

// @desc    SIGN UP new user
// @route   POST /api/v1/auth/signup  --- > http://localhost:8080/auth/signup
// @access  Public
router.post('/signup', async (req, res, next) => {
  const { email, password, username } = req.body;
  // Check if email or password or name are provided as empty string 
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: 'Please fill all the fields to register' });
    return;
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Not a valid email format' });
    return;
  }
   // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter' });
    return;
  }
  try {
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      res.status(400).json({ message: `User already exists with email ${email}` })
      return;
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ email, hashedPassword, username });
      res.status(201).json({ data: newUser });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    LOG IN user
// @route   POST /auth/login 
// @access  Public
router.post('/login', async (req, res, next) => { 
  console.log(req.headers);
  const { email, password } = req.body;
  // Check if email or password are provided as empty string 
  if (email === "" || password === "") {
    res.status(400).json({ message: 'Please fill all the fields to login' });
    return;
  }
  try {
    //  user exists?
    const userInDB = await User.findOne({ email });
    // If they don't exist, return an error
    if (!userInDB) {
      res.status(404).json({ success: false, message: `No user registered by email ${email}` })
      return;
    } else {
      const passwordMatches = bcrypt.compareSync(password, userInDB.hashedPassword);
      if (passwordMatches) {
        // store in the jwt token
        const payload = {
          email: userInDB.email,
          username: userInDB.username,
          role: userInDB.role,
          _id: userInDB._id
        }
        // Use the jwt middleware to create de token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "30d" }
        );
        res.status(200).json({ authToken: authToken })
      } else {
        // password is not right, return an error
        res.status(401).json({ success: false, message: 'Unable to authenticate user'})
      }
    }
  } catch (error) {
    next(error)
  }
});

// @desc    GET logged in user
// @route   GET ?
// @access  Private
router.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    // If JWT token is valid: payload gets decoded by the
    // isAuthenticated middleware and made available on req.payload
    console.log('Whose token is on the request:', req.payload);
    // Fetch user data from the database using the user's _id
    const user = await User.findById(req.payload._id).select('-hashedPassword');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Send back the user data
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// @desc    GET user's profile
// @route   GET /auth/myprofile
// @access  Private
router.get('/myprofile', isAuthenticated, async (req, res, next) => {
  try {
    // If JWT token is valid: payload gets decoded by the
    // isAuthenticated middleware and made available on req.payload
    console.log('Whose token is on the request:', req.payload);
    // Fetch user data from the database using the user's _id
    const user = await User.findById(req.payload._id).select('-hashedPassword');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Send back the user data
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/myprofile', isAuthenticated, async (req, res, next) => {
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

// @desc    EDIT USER
// @route   PUT 
// @access  Private
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
});

// @desc    DELETE user
// @route   DELETE auth/:id?
// @access  Private
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: deletedUser });
  } catch (error) {
    next(error);
  }
});


module.exports = router;