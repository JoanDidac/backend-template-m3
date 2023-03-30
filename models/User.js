const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const User = mongoose.model('User', userSchema);

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
},
  {
    timestamps: true
  });
  //static methods for the User schema. callback to be defined. callback is handling the result of the update/delete request.
  userSchema.statics.updateUser = (id, updateData, callback) => {
    userSchema.findByIdAndUpdate(id, updateData, { new: true }, (error, updatedUser) => {
      if (error) {
        callback(error);
      } else {
        callback(null, updatedUser);
      }
    });
  };
  
  User.statics.deleteUser = (id, callback) => {
    User.findByIdAndDelete(id, (error, deletedUser) => {
      if (error) {
        callback(error);
      } else {
        callback(null, deletedUser);
      }
    });
  };
  
module.exports = model("User", userSchema);
