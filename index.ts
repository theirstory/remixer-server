const express = require("express");
const cors = require("cors");
//const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const http = require("http");
import { list, duration, remixVideos } from "./videos";
import { basename } from "path";
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;

//app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/list", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const videos = await list();
  res.end(JSON.stringify(videos));
});

app.get("/duration/:video", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const d: number = await duration(req.params.video);
  res.end(JSON.stringify(d));
});

app.post("/remix", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const remixedVideoPath: string = await remixVideos(req.body);
  const remixedVideo: string = basename(remixedVideoPath);
  return res.send(JSON.stringify({
    remixedVideo: remixedVideo
  }));
});

// app.post("/add", async (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   return res.send(JSON.stringify(req.body));
// });

// app.post("/remove", async (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   return res.send(JSON.stringify(req.body));
// });

// Start the express application
http.createServer(app).listen(port, () => {
  console.log(`remixer-server listening on port ${port}`);
});
