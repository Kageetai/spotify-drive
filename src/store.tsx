import React, { createContext, useReducer } from 'react';

import { actions, Action } from './actions';

const initialState = {
  isLoggedIn: false,
};
type State = typeof initialState;

const store = createContext(initialState);
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
