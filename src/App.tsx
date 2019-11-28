import React from 'react';

import './App.css';
import Me from './Me';
import { createAuthorizeURL, initApi, getIsLoggedIn } from './utils/spotify';
import { store } from './store';
import { setIsLoggedIn as setIsLoggedInAction } from './actions';

const App: React.FC = () => {
  // const [isLoggedIn, setIsLogged] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const { dispatch, state } = React.useContext(store);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code') || '';

    initApi(authCode).then(() => {
      // setIsLogged(getIsLoggedIn());
      dispatch(setIsLoggedInAction(getIsLoggedIn()));
    });

    if (authCode) {
      window.history.replaceState({}, document.title, '/');
    }
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Library Manager</h1>

        {state.isLoggedIn ? (
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
