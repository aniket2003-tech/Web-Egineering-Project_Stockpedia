const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isSubscriber: { type: Boolean, default: false },
  subscription_date: { type: Date, default: Date.now },
  unsubscription_date: { type: Date, default: Date.now },
  profileImageUrl: { type: String, default: "http://localhost:5000/Uploads/defaultUserImage.png" }
});

// Create and export the user model
const User = mongoose.model('User', userSchema);
module.exports = User;
