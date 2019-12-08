import styled from '@emotion/styled';

import theme from './theme';

const StyledApp = styled('div')`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  font-family: 'Open Sans', sans-serif;

  a {
    display: inline-block;
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: all 0.5s;
  }

  a:hover {
    text-shadow: 0 0.1em 0.1em lightgray;
    transform: translateY(-0.05em);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colors.primary};
  }
`;

export default StyledApp;
