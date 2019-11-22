/* eslint-disable @typescript-eslint/camelcase */
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { stringify } from 'querystring';

import { generateRandomString } from '../src/utils/random';

interface HelloResponse {
  statusCode: number;
  body: string;
}

const spotifyAuthBase = 'https://accounts.spotify.com/authorize?';
const stateKey = 'spotify_auth_state';
const scope = 'user-read-private user-read-email';

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const state = generateRandomString(16);
  const response = {
    statusCode: 301,
    headers: {
      Location:
        spotifyAuthBase +
        stringify({
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID,
          scope: scope,
          redirect_uri: '/',
          state: state
        }),
      'Set-Cookie': [`${stateKey}=${state}`]
    }
  };

  return callback(null, response);
};

export { handler };
