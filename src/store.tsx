import {
  Action,
  action,
  createStore,
  createTypedHooks,
  Thunk,
  thunk,
} from 'easy-peasy';
import spotifyApi from './utils/spotify';
import { SpotifyUser } from './types/spotify';

interface Store {
  isLoggedIn: boolean;
  me?: SpotifyUser;
  setIsLoggedIn: Action<Store, boolean>;
  setMe: Action<Store, SpotifyUser>;
  fetchMe: Thunk<Store>;
}

const initialState: Store = {
  isLoggedIn: false,
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
  setMe: action((state, payload) => {
    state.me = payload;
  }),
  fetchMe: thunk(async (actions) => {
    const res = await spotifyApi.getMe();
    actions.setMe(res.body);
  }),
};

export const store = createStore(initialState);

const typedHooks = createTypedHooks<Store>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
