const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// conntects to a local mongoDB database
mongoose.connect(
  `mongodb+srv://stocks-admin:${process.env.ATLAS_PASSWORD}@cluster0.jzk7h.mongodb.net/Cluster0?retryWrites=true&w=majority`
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));

// allows cors with the frontend

app.use(express.static(path.resolve(__dirname, "./build")));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
