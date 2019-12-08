import { action, Action } from 'easy-peasy';

import { Playlist, SpotifyUser } from './types/spotify';
import { Store } from './store';

export interface Actions {
  setIsLoggedIn: Action<Store, boolean>;
  setMe: Action<Store, SpotifyUser>;
  setPlaylists: Action<Store, Playlist[]>;
  setSelectedPlaylist: Action<Store, string>;
}

const actions: Actions = {
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setMe: action((state, payload) => {
    state.me = payload;
  }),
  setPlaylists: action((state, payload) => {
    state.playlists = payload;
  }),
  setSelectedPlaylist: action((state, payload) => {
    state.selectedPlaylist = payload;
  }),
};

export default actions;
