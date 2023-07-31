const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

router.get("/", (req, res) => {
  const skateSpots = JSON.parse(fs.readFileSync("./data/skate-spots.json"));
  res.status(200).json(skateSpots);
});

router.get("/:id", (req, res) => {
  const skateSpots = JSON.parse(fs.readFileSync("./data/skate-spots.json"));

  const selectedSkateSpot = skateSpots.find((skateSpot) => {
    return skateSpot.id === req.params.id;
  });

  res.status(201).json(selectedSkateSpot);
});

router.post("/:id", (req, res) => {
  const newComment = {
    id: crypto.randomBytes(16).toString("hex"),
    name: req.body.name,
    comment: req.body.comment,
    likes: "0",
    timestamp: Date.now(),
  };

  const comments = JSON.parse(fs.readFileSync("./data/skate-spots.json"));

  videos.push(newComment);

  fs.writeFileSync("./data/skate-spots.json", JSON.stringify(comments));

  res.status(201).json(newComment);
});

module.exports = router;
