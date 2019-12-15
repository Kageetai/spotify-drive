import React from 'react';
import { Link } from 'react-router-dom';

import { useStoreState } from '../store';
import StyledHeader from '../styled/Header';

import Profile from './Profile';

const Header = () => {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);

  return (
    <StyledHeader>
      <Link to="/">
        <h1>Spotify Drive</h1>
      </Link>

      {isLoggedIn && <Profile />}
    </StyledHeader>
  );
};

export default Header;
