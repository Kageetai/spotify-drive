import { NowRequest, NowResponse } from "@now/node";

export const handler = (request: NowRequest, response: NowResponse) => {
  const { name = "World" } = request.query;
  response.status(200).send(`Hello ${name}!`);
};

export default handler;
