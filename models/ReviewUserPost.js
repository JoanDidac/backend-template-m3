const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewUserPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true
  },
  media: {
    type: String,
    required: true
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
},
{
  timestamps: true
});

module.exports = model("ReviewUserPost", reviewUserPostSchema);
