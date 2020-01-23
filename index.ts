const express = require("express");
const cors = require("cors");
//const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const http = require("http");
import { list, info, remixMedia } from "./media";
import { basename } from "path";
import { emptyRemixFolder } from "./utils";
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
  const media = await list();
  res.end(JSON.stringify(media));
});

app.get("/info/:media", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const i: any = await info(req.params.media);
  res.end(JSON.stringify(i));
});

app.post("/remix", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (!process.env.PRODUCTION) {
    await emptyRemixFolder();
  }

  const remixedMediaPath: string = await remixMedia(req.body);
  const remixedMedia: string = basename(remixedMediaPath);

  return res.send(JSON.stringify({
    remixedMedia: remixedMedia
  }));
});

// Start the express application
http.createServer(app).listen(port, () => {
  console.log(`remixer-server listening on port ${port}`);
});
