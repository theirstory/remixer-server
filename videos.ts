import { promise as glob } from "glob-promise";
import { basename } from "path";
import ffprobe from "ffprobe";
import ffprobeStatic from "ffprobe-static";

export const list = async () => {
  const videosPattern = "./public/videos/*.mp4";

  const videos = await glob(videosPattern, {
    ignore: []
  });

  const response = [];

  await Promise.all(videos.map(async (video) => {
    response.push(basename(video));
  }));

  return response;
}

export const duration = async (video: string) => {
  video = "./public/videos/" + video;
  const info: any = await ffprobe(video, { path: ffprobeStatic.path });
  if (info && info.streams && info.streams.length) {
      const duration: number = Number(info.streams[0].duration);
      return duration;
  }
  return 0;
}