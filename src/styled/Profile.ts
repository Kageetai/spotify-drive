import styled from '@emotion/styled';

import theme from './theme';

export default styled('div')`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;

  > img {
    width: 100px;
    height: 100px;
    margin-right: ${theme.grid.base};
  }
`;
