const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3001;

// conntects to a local mongoDB database
mongoose.connect("mongodb://localhost/stonkusers");
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));

// allows cors with the frontend
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
