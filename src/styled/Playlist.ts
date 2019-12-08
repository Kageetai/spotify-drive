import styled from '@emotion/styled';

export default styled('div')`
  > h2 {
    > *:last-child:not(:only-child) {
      float: right;
    }
  }

  > img {
    width: 300px;
    height: auto;
  }
`;
