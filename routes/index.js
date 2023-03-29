const router = require('express').Router();
const Drone = require('../models/Drone');
const Like = require('../models/Like');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    GET ALL drones
// @route   GET /drones
// @access  Public
router.get('/drones', async (req, res, next) => {
  try {
    const drones = await Drone.find();
    res.status(200).json(drones);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drones when get/drones'  });
  }
});

// @desc    GET SINGLE drone by ID
// @route   GET /drones/:id
// @access  Public
router.get('/drones/:id', async (req, res, next) => {
  try {
    const drone = await Drone.findById(req.params.id);
    if (!drone) {
      return res.status(404).json({ message: 'Drone not found when /drones/:id' });
    }
    res.status(200).json(drone);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drone' });
  }
});

// @desc    CREATE NEW drone
// @route   POST /drones
// @access  Private
router.post('/drones', async (req, res, next) => {
  try {
    // adds the user ._id from req.payload to the drone
    const droneData = {
      ...req.body,
      user: req.payload._id
    };

    const drone = new Drone(droneData);
    await drone.save();
    res.status(201).json(drone);
  } catch (error) {
    res.status(500).json({ message: 'Error creating drone when post/drones' });
  }
});

// @desc    LIKE a drone
// @route   POST /drones/:id/likes
// @access  Private
router.post('/drones/:id/likes', isAuthenticated, async (req, res, next) => {
  try {
    const droneId = req.params.id;
    const userId = req.payload._id;
    const drone = await Drone.findById(droneId);
    //check if drone id is valid
      if (!drone) {
        return res.status(404).json({ message: 'Drone not found' });
      }


    // Check if like  exists
    const existingLike = await Like.findOne({ drone: droneId, user: userId });

    if (existingLike) {
      return res.status(400).json({ message: 'User already liked this drone' });
    }

    // Create  like
    const like = new Like({ drone: droneId, user: userId });
    await like.save();

    res.status(201).json({ message: 'Drone liked aamigo' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking the drone my friendo' });
  }
});


// @desc    UPDATE drone by ID
// @route   PUT /drones/:id
// @access  Public
router.put('/drones/:id', async (req, res, next) => {
  try {
    const drone = await Drone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!drone) {
      return res.status(404).json({ message: 'Drone not found when /drones/:id' });
    }
    res.status(200).json(drone);
    console.log("Drone Updated!");
    //check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Drone not found' });
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error updating drone' });
  }
});

// @desc    DELETE drone by ID
// @route   DELETE /drones/:id
// @access  Public???
router.delete('/drones/:id', async (req, res, next) => {
  try {
    const drone = await Drone.findByIdAndDelete(req.params.id);
    if (!drone) {
      return res.status(404).json({ message: 'Drone not found when delete/drones/:id' });
    }
    res.status(200).json({ message: 'Drone deleted successfully when delete/drones/:id' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting drone' });
  }
});

// ...

// @desc    CREATE POST with media
// @route   POST /posts
// @access  Private
router.post('/posts', async (req, res, next) => {
  try {
    const userId = req.payload._id;
    const postTitle = req.body.title;
    const postMessage = req.body.message;
    const mediaUrls = req.body.mediaUrls;

    await createPostWithMedia(userId, postTitle, postMessage, mediaUrls);

    res.status(201).json({ message: 'Post created with media successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post with media' });
  }
});

module.exports = router;


module.exports = router;
