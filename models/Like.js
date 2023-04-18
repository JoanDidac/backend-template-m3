const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likeSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
{
  timestamps: true
});

module.exports = model("Like", likeSchema);
