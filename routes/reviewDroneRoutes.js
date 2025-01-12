const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt");
const mongoose = require("mongoose");
const ReviewDrone = require("../models/ReviewDrone");

// @desc    GET all reviews from Drone
// @route   GET /reviews
// @access  PUBLIC!!!
router.get("/", async (req, res, next) => {
  try {
    const review = await ReviewDrone.find().populate('drone');
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

// @desc    GET SINGLE review by ID
// @route   GET /reviews/user
// @access  Private
router.get("/user", isAuthenticated, async (req, res, next) => {
  const user = req.payload;
  try {
    const reviews = await ReviewDrone.find({ user: user._id }).populate(
      "drone"
    );
    if (!reviews) {
      return res
        .status(404)
        .json({ message: "Drones not found when /reviews/:id" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching single review when /reviews/:id" });
  }
});

// @desc    GET SINGLE review by ID
// @route   GET /reviews/:id
// @access  Private
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const review = await ReviewDrone.findById(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Drone not found when /reviews/:id" });
    }
    res.status(200).json(review);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching single review when /reviews/:id" });
  }
});

// @desc    Check if a review exists for a given drone and user
// @route   GET /reviews/check-review/:droneId/:userId
// @access  Private
router.get(
  "/check-review/:droneId/:userId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { droneId, userId } = req.params;
      const review = await ReviewDrone.findOne({
        drone: droneId,
        user: userId,
      });
      res.status(200).json(Boolean(review));
    } catch (error) {
      next(error);
    }
  }
);

// @desc    CREATE NEW review
// @route   POST /reviews
// @access  Private
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    // adds the user ._id from req.payload to the review
    const reviewData = {
      ...req.body,
      user: req.payload._id,
    };

    const review = await ReviewDrone.create(reviewData);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating drone when post/drones" });
  }
});

// @desc    UPDATE review by ID
// @route   PUT /reviews/:id
// @access  Private
router.put("/edit/:id", isAuthenticated, async (req, res, next) => {
  //check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "review not found" });
  }
  try {
    const review = await ReviewDrone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found when /reviews/edit/:id" });
    }
    res.status(200).json(review);
    console.log("Review Updated!");
  } catch (error) {
    next(error);
  }
});

// @desc    GET all reviews for drone by ID "View REviews" button in DroneList.jsx
// @route   GET /reviews/drone/:id
// @access  PUBLIC!!!
router.get("/drone/:id", async (req, res, next) => {
  try {
    const reviews = await ReviewDrone.find({ drone: req.params.id }).populate('drone');
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});
// @desc    GET reviews by user ID  "My Reviews" button in MyProfile.jsx
// @route   GET /reviews/user/:id
// @access  Private
router.get("/user/:id", isAuthenticated, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const reviews = await ReviewDrone.find({ user: userId }).populate("drone");
    if (!reviews) {
      return res.status(404).json({ message: "Drones not found when /reviews/user/:id" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews when /reviews/user/:id" });
  }
});


// @desc    DELETE review by ID
// @route   DELETE /reviews/:id
// @access  Private
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const review = await ReviewDrone.findByIdAndDelete(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found when delete/review/:id" });
    }
    res
      .status(200)
      .json({ message: "Review deleted successfully when delete/review/:id" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
