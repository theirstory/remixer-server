import { promise as glob } from "glob-promise";
import { basename, join } from "path";
import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";
import { getVideoPath } from "./utils";
const dotenv = require("dotenv");
dotenv.config();

export const list = async () => {
  const videosPattern: string = join(process.env.VIDEO_PATH, "*.mp4");

  const videos: string[] = await glob(videosPattern, {
    ignore: []
  });

  const response: string[] = [];

  await Promise.all(videos.map(async (video) => {
    response.push(basename(video));
  }));

  return response;
}

export const duration = async (video: string) => {
  video = getVideoPath(video);
  const info: any = await ffprobe(video, { path: ffprobeStatic.path });
  if (info && info.streams && info.streams.length) {
    const duration: number = Number(info.streams[0].duration);
    return duration;
  }
  return 0;
}