const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;

const skateSpotRoutes = require("./routes/skate-spots");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/skate-spots", skateSpotRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});