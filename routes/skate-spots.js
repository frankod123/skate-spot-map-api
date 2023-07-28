const express = require("express");
const router = express.Router();
const fs = require("fs");
// const crypto = require("crypto");

router.get("/", (req, res) => {
  const skateSpots = JSON.parse(fs.readFileSync("./data/skate-spots.json"));
  res.status(200).json(skateSpots);
});

router.get("/:slug", (req, res) => {
  const skateSpots = JSON.parse(fs.readFileSync("./data/skate-spots.json"));

  const selectedSkateSpot = skateSpots.find((skateSpot) => {
    return skateSpot.slug === req.params.slug;
  });

  res.status(201).json(selectedSkateSpot);
});

module.exports = router;
