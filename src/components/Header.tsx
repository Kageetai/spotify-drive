import React from 'react';

import { useStoreState } from '../store';
import StyledHeader from '../styled/Header';

import Profile from './Profile';

const Header = () => {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);

  return (
    <StyledHeader>
      <h1>Spotify Library Manager</h1>

      {isLoggedIn && <Profile />}
    </StyledHeader>
  );
};

export default Header;
