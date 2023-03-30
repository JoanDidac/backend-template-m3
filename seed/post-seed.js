require('dotenv').config();
const mongoose = require('mongoose');
const UserPost = require('../models/UserPost');

const initialPosts = [
    {
        user: "6425bd2acf3475ed6f37f4fc",
        title: "Topnotch Drone",
        message: "I've been using it for over a month and the machine its just incredible, one of a kind.",
        media: "https://novodrone.com/wp-content/uploads/2020/12/dron-4k-640x640.jpg"
        
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
