require('dotenv').config();
const mongoose = require('mongoose');
const ReviewDrone = require('../models/ReviewDrone');



const initialReviews = [
    {
        name: "Test",
        comment:"Very agile and versatile Drone that will fulfill all your wet dreams for sure",
        rating: 3 ,
        drone: "6420e03f055f610570a6f5f6",
        user:"6425bd2acf3475ed6f37f4fc"
        
    },
    {
        name: "Test2",
        comment:"Its quite shitty, just try it and it will become obvious",
        rating: 3 ,
        drone: "6420e03f055f610570a6f5f6",
        user:"6423293e0cc50fe8b4c701fb"
    },
    {
        name: "Test3",
        comment:"In my case I had a good average experience, the battery its ok but its really noisy.",
        rating: 3 ,
        drone: "6420e03f055f610570a6f5f6",
        user:"642326d9e147cf681fe4f7d0"
    }
]
  

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return ReviewDrone.create(initialReviews);
  })
  .then(() => {
    console.log('Reviews Seed done successfully 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  });
