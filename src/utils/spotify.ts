import 'isomorphic-fetch';
import SpotifyWebApi from 'spotify-web-api-node';

import { SpotifyAuth } from '../types/spotify';

interface SpotifyAuthVanilla {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: string;
  refresh_token: string;
}

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const expiresIn = localStorage.getItem('expiresIn');

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
});

const mapAuth = (auth: SpotifyAuthVanilla): SpotifyAuth => ({
  accessToken: auth.access_token,
  scope: auth.scope,
  expiresIn: auth.expires_in,
  refreshToken: auth.refresh_token,
});

const fetchToken = (authCode: string) =>
  fetch(process.env.REACT_APP_LAMBDA_BASE + 'token?authCode=' + authCode)
    .then((res) => res.json())
    .then((auth) => mapAuth(auth));

export const initApi = (authCode?: string) => {
  console.log('initApi');
  if (authCode) {
    fetchToken(authCode).then((auth) => {
      spotifyApi.setAccessToken(auth.accessToken);
      spotifyApi.setRefreshToken(auth.refreshToken);
      localStorage.setItem('accessToken', auth.accessToken);
      localStorage.setItem('expiresIn', auth.expiresIn);
      localStorage.setItem('refreshToken', auth.refreshToken);
    });
  } else if (accessToken && refreshToken) {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
  } else {
    console.error('error initializing spotify api')
  }
};

export const isLoggedIn = () => !!localStorage.getItem('accessToken');
