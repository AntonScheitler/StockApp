const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware to verify the jwt in the request header
function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json({ auth: false, message: "no token specified" });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
      if (err) {
        res.json({ auth: false, message: "error while verifying: " + err });
      } else {
        res.locals.user = jwt.decode(token);
        next();
      }
    });
  }
}

// sends the decoded user to the frontend, if the jwt is valid
router.get("/auth", verifyToken, (req, res) => {
  res.json({ auth: true, message: "authorized", user: res.locals.user });
});

module.exports = router;
