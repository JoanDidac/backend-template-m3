const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const droneSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  specs: {
    maxFlightTime: Number,
    maxSpeed: Number,
    range: Number,
    weight: Number,
    dimensions: String
//   },
//   price: {
//     type: Number,
//     required: true
  },
//   availability: {
//     type: Boolean,
//     default: true
//   },
  user: { //Adding Drone owner TBC
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
  {
    timestamps: true
  });

module.exports = model("Drone", droneSchema);


// **Possible specs** 
//  -Battery life
//  -Camera {
//     field of view: in degrees,
//     ISO: 100-12800,
//     resolution: 4K,
//     Max-distance flight: 15km,
//     Obstacle detection: boolean y/n or (enum : 1 fron 1 rear, 2 front 2 rear etc)
//     Frequency : 120Hz,
//  }
