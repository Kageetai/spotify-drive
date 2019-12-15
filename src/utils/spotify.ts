import 'isomorphic-fetch';
import SpotifyWebApi from 'spotify-web-api-node';

import { SpotifyAuth, SpotifyAuthVanilla } from '../types/spotify';

import { generateRandomString } from './random';

const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
];
const redirectUri = window.location.origin + '/';

let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let expiresIn = parseInt(localStorage.getItem('expiresIn') || '0');
let expiresAt = parseInt(localStorage.getItem('expiresAt') || '0');
const state = localStorage.getItem('authState');

const isDefined = (item: string) => item !== '' && item !== 'undefined' && item !== 'NaN';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  redirectUri: redirectUri,
});

export default spotifyApi;

export const createAuthorizeURL = () => {
  const newState = generateRandomString(16);
  localStorage.setItem('authState', newState);
  return spotifyApi.createAuthorizeURL(scopes, newState);
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
  fetch(process.env.REACT_APP_LAMBDA_BASE + 'refresh?refreshToken=' + refreshToken)
    .then((res) => res.json())
    .then(mapAuth);

const setLocalToken = (auth: SpotifyAuth) => {
  spotifyApi.setAccessToken(auth.accessToken);
  if (auth.refreshToken) {
    spotifyApi.setRefreshToken(auth.refreshToken);
  }

  const absoluteExpiresAt = Date.now() + parseInt(auth.expiresIn) * 1000;
  localStorage.setItem('accessToken', auth.accessToken);
  localStorage.setItem('expiresIn', auth.expiresIn);
  localStorage.setItem('expiresAt', absoluteExpiresAt.toString());
  if (auth.refreshToken) {
    localStorage.setItem('refreshToken', auth.refreshToken);
  }
  accessToken = auth.accessToken;
  expiresIn = parseInt(auth.expiresIn);
  expiresAt = absoluteExpiresAt;
  if (auth.refreshToken) {
    refreshToken = auth.refreshToken;
  }
};

export const clearLocalToken = () => {
  localStorage.clear();
};

export const initApi = async (authCode?: string, newState?: string) => {
  if (authCode && isDefined(authCode)) {
    if (newState !== state) {
      console.error('state mismatch');
      return new Promise((resolve, reject) => reject());
    }
    return fetchToken(authCode)
      .then(setLocalToken)
      .catch((err) => console.error(err));
  } else if (refreshToken && isDefined(refreshToken) && isTokenExpired()) {
    console.log('token expired, fetching new one');
    return fetchNewToken()
      .then(setLocalToken)
      .catch((err) => console.error(err));
  } else if (
    accessToken &&
    refreshToken &&
    expiresIn &&
    expiresAt &&
    isDefined(accessToken) &&
    isDefined(refreshToken)
  ) {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
    return new Promise((resolve) => resolve());
  }
};

const isTokenExpired = () => expiresAt && Date.now() > expiresAt;

export const getIsLoggedIn = () =>
  !!accessToken && accessToken !== 'undefined' && !isTokenExpired();
