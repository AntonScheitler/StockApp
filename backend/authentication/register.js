const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// saves new user in the database, sends a jwt to the frontend
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  // checks if the user already exists
  if (user) {
    res.json({ auth: false, message: "user already exists" });
    return;
  }
  // encypts password, saves user in the database
  const hash = await bcrypt.hash(password, 10);

  const newUser = new User({
    email: email,
    password: hash,
    watchlist: [],
  });

  await newUser.save();

  // generates a jwt, sends it to the frontend
  const tokenUser = {
    email: newUser.email,
    watchlist: newUser.watchlist,
  };
  const token = jwt.sign(tokenUser, process.env.TOKEN_SECRET);
  res.json({ auth: true, token: token });
});

// test endpoint for loggin every user
router.get("/show", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// test endpoint for deleting a user
router.get("/delete", async (req, res) => {
  await User.findOneAndDelete({ email: "newUser@gmail.com" });
  res.send("user deleted");
});

module.exports = router;
