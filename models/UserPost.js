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
    type: [String],
    required: true
  },
  media: {
    type: [String],
    required:true
  },
  // location: {
  //   type: {
  //     latitude: {
  //       type: Number,
  //       // required: true
  //     },
  //     longitude: {
  //       type: Number,
  //       // required: true
  //     }
  //   },
  //   // required: true
  // }
},
  {
    timestamps: true
  });

module.exports = model("UserPost", userPostSchema);
