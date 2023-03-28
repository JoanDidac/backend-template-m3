const router = require('express').Router();
const Drone = require('../models/Drone');

// @desc    Get all drones
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

// @desc    Get single drone by ID
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

// @desc    Create new drone
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


// @desc    Update drone by ID
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
  } catch (error) {
    res.status(500).json({ message: 'Error updating drone' });
  }
});

// @desc    Delete drone by ID
// @route   DELETE /drones/:id
// @access  Public
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

module.exports = router;
