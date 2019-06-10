const express = require("express");
const app = express();
const dotenv = require("dotenv");
const http = require("http");
import { listVideos } from "./videos";
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/videos", async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const videos = await listVideos();
  res.end(JSON.stringify(videos));
});

// Start the express application
http.createServer(app).listen(port, () => {
  console.log(`remixer-server listening on port ${port}`);
});
