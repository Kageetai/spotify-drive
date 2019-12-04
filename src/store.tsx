import { createStore, createTypedHooks } from 'easy-peasy';

import { SpotifyUser } from './types/spotify';
import actions, { Actions } from './actions';
import thunks, { Thunks } from './thunks';

export interface Store extends Actions, Thunks {
  isLoggedIn: boolean;
  me?: SpotifyUser;
}

const initialState: Store = {
  isLoggedIn: false,
  ...actions,
  ...thunks,
};

export const store = createStore(initialState);

const typedHooks = createTypedHooks<Store>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
