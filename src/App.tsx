/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import './App.css';
import Me from './Me';
import { createAuthorizeURL, initApi, isLoggedIn } from './utils/spotify';

const urlParams = new URLSearchParams(window.location.search);
const authCode = urlParams.get('code') || '';
initApi(authCode);
if (authCode) {
  window.history.replaceState({}, document.title, '/');
}

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Library Manager</h1>

        {isLoggedIn() ? (
          <Me />
        ) : (
          <a className="App-link" href={createAuthorizeURL()}>
            Login
          </a>
        )}
      </header>
    </div>
  );
};

export default App;
