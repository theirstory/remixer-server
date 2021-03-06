import { join } from "path";
const uuidv1 = require('uuid/v1');
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path")
dotenv.config();

export const emptyRemixFolder = () => {
  const directory: string = process.env.REMIXES_PATH;

  return new Promise<void>((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
      }
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }

      resolve();
    });
  });
}

export const getMediaPath = (media: string) => {
  return join(process.env.MEDIA_PATH, media);
}

export const getRemixedMediaPath = () => {
  return join(process.env.REMIXES_PATH, uuidv1() + ".mp4");
}