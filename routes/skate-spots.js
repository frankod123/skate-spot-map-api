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

router.post("/:id/comments", (req, res) => {
  const newComment = {
    id: crypto.randomBytes(16).toString("hex"),
    name: req.body.name,
    comment: req.body.comment,
    likes: "0",
    timestamp: Date.now(),
  };

  const skateSpots = JSON.parse(fs.readFileSync("./data/skate-spots.json"));
  const selectedSkateSpot = skateSpots.find((spot) => {
    return spot.id === req.params.id;
  });

  selectedSkateSpot.comments.push(newComment);

  const updatedSkateSpots = skateSpots.map((spot) =>
    spot.id === selectedSkateSpot.id ? selectedSkateSpot : spot
  );

  fs.writeFileSync(
    "./data/skate-spots.json",
    JSON.stringify(updatedSkateSpots)
  );

  res.status(201).json(newComment);
});

module.exports = router;
