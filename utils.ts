import { join } from "path";
const uuidv1 = require('uuid/v1');
const dotenv = require("dotenv");
dotenv.config();

export const getVideoPath = (video: string) => {
  return join(process.env.VIDEO_PATH, video);
};

export const getRemixedVideoPath = () => {
  return join(process.env.REMIXED_VIDEO_PATH, uuidv1() + ".mp4");
};