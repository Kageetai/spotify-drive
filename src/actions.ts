import { action, Action } from 'easy-peasy';

import { Playlist, PlaylistTrack, SpotifyUser } from './types/spotify';
import { Store } from './store';

export interface Actions {
  setError: Action<Store, Error>;
  setIsLoggedIn: Action<Store, boolean>;
  setMe: Action<Store, SpotifyUser>;
  setPlaylists: Action<Store, Playlist[]>;
  setSelectedPlaylist: Action<Store, Playlist | null>;
  setPlayListTracks: Action<Store, { playlistId: string; tracks: PlaylistTrack[] }>;
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
  setPlaylists: action((state, playlists) => {
    state.playlists = playlists;
  }),
  setSelectedPlaylist: action((state, playlist) => {
    state.selectedPlaylist = playlist;
  }),
  setPlayListTracks: action((state, payload) => {
    const { playlistId, tracks } = payload;

    if (state.playlists?.length) {
      const index = state.playlists.findIndex((p) => p.id === playlistId);
      state.playlists[index].tracks = tracks;
    }

    if (playlistId === state.selectedPlaylist?.id) {
      state.selectedPlaylist.tracks = tracks;
    }
  }),
};

export default actions;
