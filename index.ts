const express = require("express");
const cors = require("cors");
//const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const http = require("http");
import remix from 'ffmpeg-remix';
import { list, duration } from "./videos";
import { Clip } from './Clip';
import { getVideoPath } from './utils';
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

app.post("/merge", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const clips: Clip[] = req.body.map(clip => {
    return {
      source: getVideoPath(clip.source),
      start: clip.start,
      end: clip.end
    }
  });

  remix({
    output: getVideoPath("merged.mp4"),
    input: clips,
    limit: 5, // max ffmpeg parallel processes, default null (unlimited)
    ffmpegPath: require('ffmpeg-static').path // optionally set path to ffmpeg binary
  }, function(err, result) {
    return res.send(JSON.stringify(req.body));
  });
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
