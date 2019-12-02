import 'isomorphic-fetch';
import SpotifyWebApi from 'spotify-web-api-node';

import { SpotifyAuth, SpotifyAuthVanilla } from '../types/spotify';
import { generateRandomString } from './random';

const stateKey = 'authState';
const state = generateRandomString(16);
const scopes = ['user-read-private', 'user-read-email'];
const redirectUri = window.location.origin;

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let expiresIn = parseInt(localStorage.getItem('expiresIn') || '0');
let expiresAt = parseInt(localStorage.getItem('expiresAt') || '0');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  redirectUri: redirectUri,
});

export default spotifyApi;

export const createAuthorizeURL = () => {
  localStorage.setItem(stateKey, state);
  return spotifyApi.createAuthorizeURL(scopes, state);
};

const mapAuth = (auth: SpotifyAuthVanilla): SpotifyAuth => ({
  accessToken: auth.access_token,
  scope: auth.scope,
  expiresIn: auth.expires_in,
  refreshToken: auth.refresh_token,
});

const fetchToken = (authCode: string) =>
  fetch(
    process.env.REACT_APP_LAMBDA_BASE +
      'token?authCode=' +
      authCode +
      '&redirectUri=' +
      redirectUri,
  )
    .then((res) => res.json())
    .then(mapAuth);

const fetchNewToken = () =>
  fetch(
    process.env.REACT_APP_LAMBDA_BASE + 'refresh?refreshToken=' + refreshToken,
  )
    .then((res) => res.json())
    .then(mapAuth);

const setLocalToken = (auth: SpotifyAuth) => {
  spotifyApi.setAccessToken(auth.accessToken);
  spotifyApi.setRefreshToken(auth.refreshToken);

  const absoluteExpiresAt = Date.now() + parseInt(auth.expiresIn);
  localStorage.setItem('accessToken', auth.accessToken);
  localStorage.setItem('expiresIn', auth.expiresIn);
  localStorage.setItem('expiresAt', absoluteExpiresAt.toString());
  localStorage.setItem('refreshToken', auth.refreshToken);
  accessToken = auth.accessToken;
  expiresIn = parseInt(auth.expiresIn);
  expiresAt = absoluteExpiresAt;
  refreshToken = auth.refreshToken;
};

export const initApi = async (authCode?: string) => {
  // TODO check for state mismatch
  if (authCode && authCode !== '') {
    return fetchToken(authCode)
      .then(setLocalToken)
      .catch((err) => console.error(err));
  } else if (isTokenExpired() && refreshToken) {
    console.log('token expired, fetching new one');
    return fetchNewToken()
      .then(setLocalToken)
      .catch((err) => console.error(err));
  } else if (accessToken && refreshToken && expiresIn && expiresAt) {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
    return new Promise((resolve) => resolve());
  }
};

const isTokenExpired = () => expiresAt && expiresAt < Date.now();

export const getIsLoggedIn = () => !!accessToken && !isTokenExpired();
