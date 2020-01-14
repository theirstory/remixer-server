# remixer-server

## setup

Make sure you have a `.env` file in the project root e.g:

```
PORT=3000
VIDEOS_PATH="./public/videos/"
REMIXES_PATH="./public/remixes/"
```

You need to create `public/videos` and `public/remixes` folders too, placing your source material videos in `public/videos`. Remixed videos will be saved into `public/remixes` named with a uuid.

Then run:

  npm start