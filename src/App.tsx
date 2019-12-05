import React from 'react';

import './App.css';
import Me from './Me';
import Playlists from './Paylists';
import { createAuthorizeURL, initApi, getIsLoggedIn } from './utils/spotify';
import { useStoreActions, useStoreState } from './store';

const App: React.FC = () => {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code') || '';
    const state = urlParams.get('state') || '';

    initApi(authCode, state).then(() => {
      setIsLoggedIn(getIsLoggedIn());
    });

    if (authCode) {
      window.history.replaceState({}, document.title, '/');
    }
  }, [setIsLoggedIn]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Library Manager</h1>

        {isLoggedIn ? (
          <>
            <Me />
            <Playlists />
          </>
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
