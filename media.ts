import { promise as glob } from "glob-promise";
import { basename, join } from "path";
import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";
import { getMediaPath, getRemixedMediaPath } from "./utils";
import { Input } from "./Input";
import remix from "./remix";
const dotenv = require("dotenv");
dotenv.config();

export const list = async () => {
  const mediaPattern: string = join(process.env.MEDIA_PATH, "*.mp4");

  const media: string[] = await glob(mediaPattern, {
    ignore: []
  });

  const response: string[] = [];

  await Promise.all(media.map(async (media) => {
    response.push(basename(media));
  }));

  return response;
}

export const info = async (media: string) => {
  media = getMediaPath(media);
  const info: any = await ffprobe(media, { path: ffprobeStatic.path });
  if (info && info.streams && info.streams.length) {
    return info.streams[0];
  }
  return {};
}

export const remixMedia = async (body) => {

  return new Promise<string>((resolve, reject) => {

    const input: Input[] = body.map(annotation => {
      return {
        source: getMediaPath(annotation[1].body),
        start: annotation[1].start,
        end: annotation[1].end
      }
    });
  
    const remixedMediaPath: string = getRemixedMediaPath();

    remix({
      output: remixedMediaPath,
      input: input,
      limit: 5, // max ffmpeg parallel processes, default null (unlimited)
      ffmpegPath: require('ffmpeg-static').path // optionally set path to ffmpeg binary
    }, (_err, _result) => {
      resolve(remixedMediaPath);
    });

  });
}