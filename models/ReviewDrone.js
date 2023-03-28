const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewDroneSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  drone: {
    type: Schema.Types.ObjectId,
    ref: "Drone",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  } //Add media field so user can post inside reviews???
},
{
  timestamps: true
});

module.exports = model("ReviewDrone", reviewDroneSchema);
