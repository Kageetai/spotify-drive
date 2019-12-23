import styled from '@emotion/styled';

import theme from './theme';

export default styled('header')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 0;
  background-color: ${theme.colors.lightgray};
  padding: 0 ${theme.grid.base};

  > h1 {
    display: block;
  }
`;
