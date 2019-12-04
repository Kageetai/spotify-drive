import { Action, action, createStore, createTypedHooks } from 'easy-peasy';

interface Store {
  isLoggedIn: boolean;
  setIsLoggedIn: Action<Store, boolean>;
}

const initialState: Store = {
  isLoggedIn: false,
  setIsLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),
};

export const store = createStore(initialState);

const typedHooks = createTypedHooks<Store>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
