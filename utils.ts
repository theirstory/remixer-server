import { join } from "path";
const dotenv = require("dotenv");
dotenv.config();

export const getVideoPath = (video: string) => {
  return join(process.env.VIDEO_PATH, video);
};