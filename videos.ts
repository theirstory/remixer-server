import { promise as glob } from "glob-promise";
import { basename, join } from "path";
import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";
import { getVideoPath, getRemixedVideoPath } from "./utils";
import { Clip } from "./Clip";
import remix from "./remix";
const dotenv = require("dotenv");
dotenv.config();

export const list = async () => {
  const videosPattern: string = join(process.env.VIDEOS_PATH, "*.mp4");

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

export const remixVideos = async (body) => {

  return new Promise<string>((resolve, reject) => {

    const clips: Clip[] = body.map(clip => {
      return {
        source: getVideoPath(clip.source),
        start: clip.start,
        end: clip.end
      }
    });
  
    const remixedVideoPath: string = getRemixedVideoPath();

    remix({
      output: remixedVideoPath,
      input: clips,
      limit: 5, // max ffmpeg parallel processes, default null (unlimited)
      ffmpegPath: require('ffmpeg-static').path // optionally set path to ffmpeg binary
    }, (_err, _result) => {
      resolve(remixedVideoPath);
    });

  });
}