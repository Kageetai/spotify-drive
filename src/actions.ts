import { action, Action } from 'easy-peasy';

import { SpotifyUser } from './types/spotify';
import { Store } from './store';

export interface Actions {
  setIsLoggedIn: Action<Store, boolean>;
  setMe: Action<Store, SpotifyUser>;
}

const actions: Actions = {
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setMe: action((state, payload) => {
    state.me = payload;
  }),
};

export default actions;
