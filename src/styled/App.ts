import styled from '@emotion/styled';

const StyledApp = styled('div')`
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
  //font-size: calc(10px + 2vmin);

  a {
    display: inline-block;
    color: #158837;
    text-decoration: none;
    transition: all 0.5s;
  }

  a:hover {
    text-shadow: 0 0.1em 0.1em lightgray;
    transform: translateY(-0.05em);
  }
`;

export default StyledApp;
