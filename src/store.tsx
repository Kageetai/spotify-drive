import { createStore, createTypedHooks, State } from 'easy-peasy';

import { Playlist, PlaylistTrack, SpotifyUser } from './types/spotify';
import actions, { Actions } from './actions';
import thunks, { Thunks } from './thunks';
import spotifyApi from './utils/spotify';

export interface Store extends Actions, Thunks {
  error: Error | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  me: SpotifyUser | null;
  library: PlaylistTrack[];
  playlists: Array<Playlist>;
}

export interface Injections {
  spotifyApi: typeof spotifyApi;
}

const initialState: Store = {
  error: null,
  isLoggedIn: false,
  isLoading: false,
  me: null,
  library: [],
  playlists: [],
  ...actions,
  ...thunks,
};

export const getPlaylistById = (state: State<Store>, id: string): Playlist | undefined =>
  state.playlists.find((p) => p.id === id);

export const store = createStore(initialState, { injections: { spotifyApi } });

const typedHooks = createTypedHooks<Store>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
