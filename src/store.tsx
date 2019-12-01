import React, { createContext, Dispatch, useReducer } from 'react';

import { actions, Action } from './actions';

const initialState = {
  isLoggedIn: false,
};
type State = typeof initialState;
interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const store = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});
const { Provider } = store;

const StateProvider = ({ children }: { children: React.ReactChild }) => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case actions.SET_IS_LOGGED_IN:
        return { ...initialState, isLoggedIn: action.payload.value };
      default:
        throw new Error('wrong action type');
      // return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
