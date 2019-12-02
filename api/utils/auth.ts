export const authorization =
  'Basic ' +
  Buffer.from(
    process.env.REACT_APP_SPOTIFY_CLIENT_ID +
      ':' +
      process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  ).toString('base64');
