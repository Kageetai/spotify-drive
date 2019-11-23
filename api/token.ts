/* eslint-disable @typescript-eslint/camelcase */
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

interface Response {
  statusCode: number;
  body: string;
}

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  try {
    const authCode = event.queryStringParameters?.authCode || '';

    if (authCode) {
      const authorization =
        'Basic ' +
        Buffer.from(
          process.env.REACT_APP_SPOTIFY_CLIENT_ID +
            ':' +
            process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
        ).toString('base64');

      const params = new URLSearchParams();
      params.append('code', authCode);
      params.append(
        'redirect_uri',
        process.env.REACT_APP_SPOTIFY_REDIRECT_URI || '',
      );
      params.append('grant_type', 'authorization_code');

      fetch(`${process.env.REACT_APP_SPOTIFY_AUTH_URL_BASE}api/token`, {
        method: 'POST',
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })
        .then((res) => res.json())
        .then((token) => {
          const response: Response = {
            body: JSON.stringify({
              token,
            }),
            statusCode: 200,
          };
          return callback(null, response);
        });
    } else {
      return callback(new Error('no access code'));
    }
  } catch (e) {
    return callback(new Error(e));
  }
};

export { handler };
