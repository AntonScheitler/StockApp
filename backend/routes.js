const express = require("express");
const router = express.Router();
const loginRoutes = require("./authentication/login");
const registerRoutes = require("./authentication/register");
const authRoutes = require("./authentication/auth");
const watchlistRoutes = require("./data/watchlist");
const stockRoutes = require("./data/stocks");

// straps all routes for login, register, etc. together
router.use(loginRoutes);
router.use(registerRoutes);
router.use(authRoutes);
router.use(watchlistRoutes);
router.use(stockRoutes);

module.exports = router;
