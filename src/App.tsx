/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { stringify } from 'querystring';

import './App.css';
import { generateRandomString } from './utils/random';

const stateKey = 'spotify_auth_state';
const scope = 'user-read-private user-read-email';
const state = generateRandomString(16);
const spotifyAuthorize = `${
  process.env.REACT_APP_SPOTIFY_AUTH_URL_BASE
}?${stringify({
  response_type: 'code',
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  scope: scope,
  redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
  state: state,
})}`;

const App: React.FC = () => {
  const onLogin = () => {
    localStorage.setItem(stateKey, state);
    window.location.assign(spotifyAuthorize);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Library Manager</h1>

        <a className="App-link" href={spotifyAuthorize} onClick={onLogin}>
          Login
        </a>
      </header>
    </div>
  );
};

export default App;
