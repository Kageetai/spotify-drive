import styled from '@emotion/styled';

import theme from './theme';

export default styled('header')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.colors.lightgray};
  padding: 0 1em;

  > h1 {
    display: block;
  }
`;
