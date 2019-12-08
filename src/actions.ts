import { action, Action } from 'easy-peasy';

import { Playlist, SpotifyUser } from './types/spotify';
import { Store } from './store';

export interface Actions {
  setIsLoggedIn: Action<Store, boolean>;
  setMe: Action<Store, SpotifyUser>;
  setPlaylists: Action<Store, Playlist[]>;
  setSelectedPlaylist: Action<Store, Playlist>;
}

const actions: Actions = {
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setMe: action((state, me) => {
    state.me = me;
  }),
  setPlaylists: action((state, playlists) => {
    state.playlists = playlists;
  }),
  setSelectedPlaylist: action((state, playlist) => {
    state.selectedPlaylist = playlist;
  }),
};

export default actions;
