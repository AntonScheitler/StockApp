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
        `https://cloud.iexapis.com/stable/stock/${stocks[i]}/quote?token=${process.env.API_KEY}`
      );
      // additional data gets stored in the output array
      const { companyName, currency, symbol, latestPrice } = response.data;
      additionalData = {
        companyName,
        currency,
        symbol,
        latestPrice,
      };
      output.push(additionalData);
    }

    res.json({ success: true, stocks: output });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
