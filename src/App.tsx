/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { stringify } from 'querystring';

import './App.css';
import logo from './logo.svg';
import { generateRandomString } from './utils/random';

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href={spotifyAuthorize}>
          Login
        </a>
      </header>
    </div>
  );
};

export default App;
