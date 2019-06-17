import { join } from "path";
const uuidv1 = require('uuid/v1');
const dotenv = require("dotenv");
dotenv.config();

export const getVideoPath = (video: string) => {
  return join(process.env.VIDEOS_PATH, video);
};

export const getRemixedVideoPath = () => {
  return join(process.env.REMIXES_PATH, uuidv1() + ".mp4");
};