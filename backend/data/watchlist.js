const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config();

// updates the database by adding a stock symbol to the watchlist
router.post("/addStock", async (req, res) => {
  // its assumed that the user's jwt is valid, since this endpoint can only be accessed from a protected route on the frontend
  // security issue?
  // security issue!
  const { stock, token } = req.body;
  const email = jwt.decode(token).email;
  const user = await User.findOne({ email: email });
  // checks if the stock already exists, adds it if it doesn't
  if (user.watchlist.indexOf(stock) !== -1) {
  } else {
    user.watchlist = [...user.watchlist, stock];
  }
  await user.save();
  // generates a new token, sends it to the frontend
  const tokenUser = {
    email: user.email,
    watchlist: user.watchlist,
  };
  const resToken = jwt.sign(tokenUser, process.env.TOKEN_SECRET);
  res.json({
    token: resToken,
  });
});

router.post("/removeStock", async (req, res) => {
  const { stock, token } = req.body;
  const email = jwt.decode(token).email;
  const user = await User.findOne({ email: email });
  user.watchlist = user.watchlist.filter((item) => {
    return item != stock;
  });
  await user.save();

  const tokenUser = {
    email: user.email,
    watchlist: user.watchlist,
  };

  const resToken = jwt.sign(tokenUser, process.env.TOKEN_SECRET);
  res.json({ token: resToken });
});

// update the database, by clearing a user's watchlist
router.post("/clearWatchlist", async (req, res) => {
  const { token } = req.body;
  // its assumed that the user's jwt is valid, since this endpoint can only be accessed from a protected route on the frontend
  // security issue?
  // security issue!
  const email = jwt.decode(token).email;
  const user = await User.findOne({ email: email });
  user.watchlist = [];
  await user.save();
  // generates a new token, sends it to the frontend
  const tokenUser = {
    email: user.email,
    watchlist: user.watchlist,
  };
  const resToken = jwt.sign(tokenUser, process.env.TOKEN_SECRET);
  res.json({
    token: resToken,
  });
});

module.exports = router;
