export enum actions {
  SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN',
}

export function setIsLoggedIn(value: boolean) {
  return {
    type: actions.SET_IS_LOGGED_IN,
    payload: {
      value,
    },
  };
}

export type Action = ReturnType<typeof setIsLoggedIn>;
