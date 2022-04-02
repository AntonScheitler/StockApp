const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// sends out an array of stocks with additional information (price, currency, etc.)
router.post("/stocks", async (req, res) => {
  const { stocks } = req.body;
  let output = [];
  let additionalData = {};
  try {
    // iterates through stock symbol array
    for (let i = 0; i < stocks.length; i++) {
      // api request to get additional data
      const response = await axios.get(
        `https://api.twelvedata.com/quote?symbol=${stocks[i]}&interval=1min&apikey=${process.env.API_KEY}`
      );
      // additional data gets stored in the output array
      const { name, currency, symbol, close } = response.data;
      additionalData = {
        companyName: name,
        currency: currency,
        symbol: symbol,
        latestPrice: close,
      };
      output.push(additionalData);
    }

    res.json({ success: true, stocks: output });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
