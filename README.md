# remixer-server

## setup

Make sure you have a `.env` file in the project root e.g:

```
PORT=3000
MEDIA_PATH="./public/media/"
REMIXES_PATH="./public/remixes/"
```

You need to create `public/media` and `public/remixes` folders too, placing your source material media in `public/media`. Remixed media will be saved into `public/remixes` named with a uuid.

Build:

    npm run build

Then run:

    npm start

## License

- [MIT](LICENSE)