/* eslint-disable @typescript-eslint/camelcase */
import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import 'isomorphic-fetch';
import { URLSearchParams } from 'url';

interface MaResponse {
  statusCode: number;
  body: string;
  headers: {};
}

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
) => {
  try {
    const authCode = event.queryStringParameters?.authCode || '';
    const redirectUri = event.queryStringParameters?.redirectUri || '';

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
      params.append('redirect_uri', redirectUri || '');
      params.append('grant_type', 'authorization_code');

      fetch(`${process.env.REACT_APP_SPOTIFY_AUTH_URL_BASE}api/token`, {
        method: 'POST',
        headers: {
          Authorization: authorization,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      })
        .then((res: Response) => res.json())
        .then((token: {}) => {
          const response: MaResponse = {
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(token),
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
