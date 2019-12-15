import styled from '@emotion/styled';

import theme from './theme';

export default styled('div')`
  display: flex;
  flex-direction: row;
  text-transform: capitalize;

  > img {
    width: 130px;
    height: 130px;
    margin-right: ${theme.grid.base};
  }
`;
