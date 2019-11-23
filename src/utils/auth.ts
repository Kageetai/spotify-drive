import 'isomorphic-fetch';

export const getToken = async (authCode: string) =>
  fetch(process.env.REACT_APP_LAMBDA_BASE + 'token?authCode=' + authCode)
    .then((res) => res.json())
    .then((token) => token);
