const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentsSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'UserPost',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

module.exports = model("Comments", commentsSchema);
