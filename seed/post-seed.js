require('dotenv').config();
const mongoose = require('mongoose');
const UserPost = require('../models/UserPost');

const initialPosts = [
    {
        user: "642326d9e147cf681fe4f7d0",
        title: "Super fun!",
        message: "Very agile and versatile Drone that will fulfill all your wet dreams for sure",
        media: "https://novodrone.com/wp-content/uploads/2020/12/dron-4k-640x640.jpg"
        
    },
    {
        user: "642326d9e147cf681fe4f7d0",
        title: "Needs improvement",
        message: "Very good looking Drone but poor battery life,  is waaay to short lasting, you cant take it into the air for more then 5 min even with full charge, not worth it for the price tag",
        media: "https://cdn.mos.cms.futurecdn.net/R966rkbjeDyz5ubEggGkUK-970-80.jpg"
    },
    {
        user: "642326d9e147cf681fe4f7d0",
        title: "Holy Stone HS720E",
        message: "Best cheap drone bundle deal with bag and batteries, needs improvement but the camera is a good quality Sony lens with physical dampening in the case and really good electronic image stabilization, though sadly no gimbal. Recordings to the MicroSD are good. ",
        media: "https://cdn.mos.cms.futurecdn.net/L5uSB8Zpud2mnzRhhfFyq8-970-80.jpg"
    }
]
  

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return UserPost.create(initialPosts);
  })
  .then(() => {
    console.log('Post Seed done successfully 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  });
