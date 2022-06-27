const axios = require("axios");
const { trackDao } = require("../dao/index");
const httpAdapter = require("axios/lib/adapters/http");
require("dotenv").config();

var INPUT = "";

const trackController = {
  uploadtrack: uploadFile,
  savetrack: createTrack,
  alltracks: getAllTrack,
  getbytrackid: getTrackById,
};

async function uploadFile(req, res, next) {
  console.log("req.file", req.file);
  if (req.file) {
    let fileOrgPath = "";
    const fullpath = req.file.path.toString().split("public");
    const filepath = fullpath[1];
    let newStr = filepath.split(" ");
    for (var i = 0; i < newStr.length; i++) {
      fileOrgPath += newStr[i];
    }
    console.log("fileOrgPath", fileOrgPath);
    const filename = req.file.originalname;
    const year = new Date().getFullYear();
    await createTrack({
      track_title: filename,
      track_path: fileOrgPath,
      year: year,
      artist_name: "",
      artist_id: "",
    });
    res.send({
      status: 200,
      data: {
        filename: filename,
        path: filepath,
      },
      error: false,
      message: "Successfully uploaded file",
    });
  } else {
    res.send({
      status: 200,
      data: {},
      error: true,
      message: "Error uploading file",
    });
  }
}

function createTrack(track) {
  trackDao.create(track).then((data) => {
    console.log("data", data);
  });
}

function getAllTrack(req, res, cb) {
  trackDao
    .all()
    .then((data) => {
      res.send({
        status: 200,
        message: "Tracks fetched successfully",
        data: data,
        error: false,
      });
    })
    .catch((error) => {
      res.send({
        errorField: error.name,
        error_message: error?.errors[0]?.message,
      });
    });
}

function getTrackById(req, res, cb) {
  var id = req.params._id;
  trackDao.one(id).then((data) => {
    INPUT = (process.env.API_BASE_URL + data?.track_path).toString();
    if (data?.track_path !== undefined) {
      console.log(
        "data :: getTrackById",
        process.env.API_BASE_URL + data?.track_path
      );
      axios
        .get(INPUT, {
          responseType: "stream",
          adapter: httpAdapter,
          "Content-Range": "bytes 16561-8065611",
        })
        .then((Response) => {
          const stream = Response.data;

          res.set("content-type", "audio/mp3");
          res.set("accept-ranges", "bytes");
          res.set("content-length", Response.headers["content-length"]);
          console.log(Response);

          stream.on("data", (chunk) => {
            res.write(chunk);
          });

          stream.on("error", (err) => {
            res.sendStatus(404);
          });

          stream.on("end", () => {
            res.end();
          });
        })
        .catch((Err) => {
          console.log("Err.message :::::", Err);
        });
    }
  });
}

module.exports = trackController;
