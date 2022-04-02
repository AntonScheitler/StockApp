const router = require("express").Router();
const axios = require("axios");
require("dotenv").config();

// sends out an array of stocks with additional information (price, currency, etc.)
router.post("/stocks", async (req, res) => {
  const { stocks } = req.body;
  let output = [];
  let stockQuery = "";

  // stockQuery for the api call gets created
  stocks.forEach((symbol) => {
    stockQuery += `${symbol},`;
  });
  try {
    // batch request to get additional data
    const response = await axios.get(
      `https://api.twelvedata.com/quote?symbol=${stockQuery}&interval=1min&apikey=${process.env.API_KEY}`
    );

    // additional data gets stored in the output array
    for (let i = 0; i < stocks.length; i++) {
      const { name, currency, symbol, close } = response.data[stocks[i]];
      output.push({
        companyName: name,
        currency,
        symbol,
        latestPrice: close,
      });
    }

    res.json({ success: true, stocks: output });
  } catch (error) {
    res.json({ success: false });
  }
});

module.exports = router;
