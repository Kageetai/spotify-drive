import styled from '@emotion/styled';

import theme from './theme';

const StyledApp = styled('div')`
  font-family: 'Open Sans', sans-serif;

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    color: ${theme.colors.primary};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colors.primary};
  }

  button {
    background-color: transparent;
    border: 1px solid ${theme.colors.primary};
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.lightgray};
    }
  }
`;

export default StyledApp;

export const Container = styled('div')`
  padding: 0 ${theme.grid.base};
  max-width: 960px;
  margin: 0 auto;
`;
