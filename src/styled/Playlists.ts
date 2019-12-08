import styled from '@emotion/styled';

export default styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;

  > li {
    border-bottom: 1px solid lightgrey;
    padding: 0.5em;

    &:hover {
      cursor: pointer;
      background-color: lightgrey;
    }
  }
`;
