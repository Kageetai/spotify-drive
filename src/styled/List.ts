import styled from '@emotion/styled';

import theme from './theme';

export default styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;

  > li {
    border-bottom: 1px solid ${theme.colors.lightgray};
    padding: 0.5em 0;

    &[onCLick]:hover {
      cursor: pointer;
      background-color: ${theme.colors.lightgray};
    }
  }
`;
