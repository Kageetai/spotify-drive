import { Global } from '@emotion/core';
import React from 'react';

import Playlists from './components/Paylists';
import globalStyles from './styled/global';
import { createAuthorizeURL, initApi, getIsLoggedIn } from './utils/spotify';
import { useStoreActions, useStoreState } from './store';
import StyledApp from './styled/App';
import Header from './components/Header';

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
    <StyledApp>
      <Global styles={globalStyles} />

      <Header />

      {isLoggedIn ? (
        <Playlists />
      ) : (
        <a className="App-link" href={createAuthorizeURL()}>
          Login
        </a>
      )}
    </StyledApp>
  );
};

export default App;
