import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";

interface IHelloResponse {
  statusCode: number;
  body: string;
}

const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const params = event.queryStringParameters;
  const response: IHelloResponse = {
    body: JSON.stringify({
      msg: `Hello world ${Math.floor(Math.random() * 10)}`,
      params
    }),
    statusCode: 200
  };

  callback(undefined, response);
};

export { handler };
