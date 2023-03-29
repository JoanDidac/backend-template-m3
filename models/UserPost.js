const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  media: [{
    type: Schema.Types.ObjectId,
    ref: 'Media',
  }]
},
  {
    timestamps: true
  });

module.exports = model("UserPost", userPostSchema);
