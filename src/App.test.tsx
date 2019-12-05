import { StoreProvider } from 'easy-peasy';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { store } from './store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StoreProvider store={store}>
      <App />
    </StoreProvider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
