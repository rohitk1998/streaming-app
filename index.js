const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./src/config/db");
const { userRouter, trackRouter } = require("./src/routes/index");
const { getAuth,getAudioFeatures_Track } = require("./src/common/index")
require('dotenv').config()

const PORT = process.env.NODE_PORT || 8000;

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));

// for parsing multipart/form-data
app.use(express.static('public'));

app.get("/", (request, response) => {
  response.json({ info: "User registration Nodejs App" });
});

//spotify access token 

getAudioFeatures_Track()

//Database Connection
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

// defining user route
app.use("/user", userRouter);
app.use("/tracks",trackRouter);

//database syncing and app server start
db.sync().then(() => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));
