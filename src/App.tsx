import React from 'react';

import './App.css';
import Me from './Me';
import { createAuthorizeURL, initApi, getIsLoggedIn } from './utils/spotify';

const App: React.FC = () => {
  const [isLoggedIn, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code') || '';

    initApi(authCode).then(() => {
      setIsLogged(getIsLoggedIn());
    });

    if (authCode) {
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Library Manager</h1>

        {isLoggedIn ? (
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
