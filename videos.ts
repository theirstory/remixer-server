import { promise as glob } from "glob-promise";

export const listVideos = async () => {
  const videosPattern = "./videos/*";

  const videos = await glob(videosPattern, {
    ignore: []
  });

  const response = [];

  await Promise.all(videos.map(async (video) => {
    response.push(video);
  }));

  return response;
}