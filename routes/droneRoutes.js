const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    GET ALL drones
// @route   GET /drones
// @access  Public
router.get('/', async (req, res, next) => {
    try {
      const drones = await Drone.find();
      res.status(200).json(drones);
    } catch (error) {
      next(error)
    }
  });
  
  // @desc    GET SINGLE drone by ID
  // @route   GET /drones/:id
  // @access  Public
  router.get('/:id', isAuthenticated, async (req, res, next) => {
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
  router.post('/', isAuthenticated, async (req, res, next) => {
    try {
      // adds the user ._id from req.payload to the drone
      const droneData = {
        ...req.body,
        user: req.payload._id
      };
  
      const drone = await Drone.create(droneData);
      res.status(201).json(drone);
    } catch (error) {
      res.status(500).json({ message: 'Error creating drone when post/drones' });
    }
  });
  
  // @desc    LIKE a drone
  // @route   POST /drones/:id/likes
  // @access  Private
  router.post('/:id/likes', isAuthenticated, async (req, res, next) => {
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
      const like = await Like.create({ drone: droneId, user: userId });

  
      res.status(201).json({ message: 'Drone liked aamigo' });
    } catch (error) {
      res.status(500).json({ message: 'Error liking the drone my friendo' });
    }
  });
  
  
  // @desc    UPDATE drone by ID
  // @route   PUT /drones/:id
  // @access  Private
  router.put('/:id', isAuthenticated, async (req, res, next) => {
    //check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
     return res.status(400).json({ message: 'Drone not found' });
    }
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
  
  // @desc    DELETE drone by ID
  // @route   DELETE /drones/:id
  // @access  Private
  router.delete('/:id', isAuthenticated, async (req, res, next) => {
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
