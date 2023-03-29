const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const mediaSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true
  }
},
  {
    timestamps: true
  });

module.exports = model("Media", mediaSchema);
