import styled from '@emotion/styled';

export default styled('ul')`
  list-style: none;
  padding: 1em;

  > li {
    border-bottom: 1px solid lightgrey;
    padding: 0.5em;

    &:hover {
      cursor: pointer;
      background-color: lightgrey;
    }
  }
`;
