const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// logs the user in, send a jwt to the frontend
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const storedUser = await User.findOne({ email: email });
  // checks if the user already exists
  if (storedUser === null) {
    res.json({ auth: false, message: "user does not exist" });
    return;
  }

  // validates the input password
  const storedPassword = storedUser.password;
  if (await bcrypt.compare(password, storedPassword)) {
    const user = {
      email: storedUser.email,
      watchlist: storedUser.watchlist,
    };

    // generates a jwt, sends it to the frontend
    const userToken = jwt.sign(user, process.env.TOKEN_SECRET);
    res.json({ auth: true, token: userToken });
  } else {
    res.json({ auth: false, message: "incorrect password" });
  }
});

module.exports = router;
