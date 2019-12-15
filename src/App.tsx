import { Global } from '@emotion/core';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Playlists from './components/Paylists';
import globalStyles from './styled/global';
import { createAuthorizeURL, initApi, getIsLoggedIn } from './utils/spotify';
import { useStoreActions, useStoreState } from './store';
import StyledApp, { Container } from './styled/App';
import Header from './components/Header';
import Library from './components/Library';
import Playlist from './components/Playlist';

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

      <Switch>
        <Route path="/library">
          <Library />
        </Route>
        <Route path="/:playlistId">
          <Playlist />
        </Route>
        <Route path="/">
          <Container>
            {isLoggedIn ? (
              <Playlists />
            ) : (
              <a className="App-link" href={createAuthorizeURL()}>
                Login
              </a>
            )}
          </Container>
        </Route>
      </Switch>
    </StyledApp>
  );
};

export default App;
