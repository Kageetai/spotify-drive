import { action, Action } from 'easy-peasy';

import { PlaylistFull, PlaylistSimplified, PlaylistTrack, SpotifyUser } from './types/spotify';
import { Store } from './store';

export interface Actions {
  setError: Action<Store, Error>;
  setIsLoggedIn: Action<Store, boolean>;
  setMe: Action<Store, SpotifyUser>;
  setLibrary: Action<Store, PlaylistTrack[]>;
  setPlaylists: Action<Store, Array<PlaylistSimplified | PlaylistFull>>;
  setPlayList: Action<Store, { playlistId: string; playlist: PlaylistFull }>;
}

const actions: Actions = {
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setMe: action((state, me) => {
    state.me = me;
  }),
  setLibrary: action((state, tracks) => {
    state.library = tracks;
  }),
  setPlaylists: action((state, playlists) => {
    state.playlists = playlists;
  }),
  setPlayList: action((state, { playlistId, playlist }) => {
    const index = state.playlists?.findIndex((p) => p.id === playlistId);
    if (index >= 0) {
      state.playlists[index] = playlist;
    } else {
      state.playlists = [...state.playlists, playlist];
    }
  }),
};

export default actions;
