const mongoose = require("mongoose");

// model for the user, who gets stored in the database
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  watchlist: [String],
});

module.exports = mongoose.model("User", userSchema);
