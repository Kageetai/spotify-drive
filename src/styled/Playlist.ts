import styled from '@emotion/styled';

import theme from './theme';

export default styled('div')`
  > h2 {
    overflow: auto;

    > img {
      width: 150px;
      height: auto;
      float: left;
      margin-right: ${theme.grid.base};
    }
  }
`;
