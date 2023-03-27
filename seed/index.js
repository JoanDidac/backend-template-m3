require('dotenv').config();
const mongoose = require('mongoose');
const Drone = require('../models/Drone');

const initialDrones = [
  {
    model: "DJI Mavic Air 2",
    brand: "DJI",
    specs: {
      maxFlightTime: 34,
      maxSpeed: 68.4,
      range: 6.2,
      weight: 570,
      dimensions: "180 x 97 x 84 mm"
    }
  },
  {
    model: "Parrot Anafi",
    brand: "Parrot",
    imageUrl: "https://www.parrot.com/global/drones/parrot-anafi",
    specs: {
      maxFlightTime: 25,
      maxSpeed: 55,
      range: 4,
      weight: 320,
      dimensions: "180 x 75 x 55 mm"
    }
  },
  {
    model: "Autel Robotics EVO II",
    brand: "Autel Robotics",
    imageUrl: "https://www.autelrobotics.com/products/evo-ii-series/evo-ii-pro/",
    specs: {
      maxFlightTime: 40,
      maxSpeed: 45,
      range: 7,
      weight: 790,
      dimensions: "268 x 230 x 107 mm"
    }
  },
  {
    model: "Skydio 2",
    brand: "Skydio",
    specs: {
      maxFlightTime: 23,
      maxSpeed: 36,
      range: 3,
      weight: 740,
      dimensions: "218 x 172 x 92 mm"
    }
  },
  {
    model: "PowerVision PowerEye",
    brand: "PowerVision",
    specs: {
      maxFlightTime: 40,
      maxSpeed: 55,
      range: 7,
      weight: 1180,
      dimensions: "410 x 310 x 140 mm"
    }
  },
  {
      model: "Yuneec Typhoon H Plus",
      brand: "Yuneec",
      imageUrl: "https://www.yuneec.com/typhoon-h-plus/",
      specs: {
      maxFlightTime: 25,
      maxSpeed: 43,
      range: 6,
      weight: 1500,
      dimensions: "450 x 453 x 258 mm"
      }
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Drone.create(initialDrones);
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  });
