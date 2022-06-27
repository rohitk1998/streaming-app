const express = require("express");
const { trackController } = require("../controller/index");
const { uploadAudio } = require("../config/muteraudio");

const songRouter = express.Router();

songRouter.post(
  "/uploadaudio",
  uploadAudio.single("_track"),
  trackController.uploadtrack
);
songRouter.get("/all", trackController.alltracks);
songRouter.get("/track/:_id", trackController.getbytrackid);

module.exports = songRouter;
