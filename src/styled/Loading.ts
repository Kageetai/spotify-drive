import styled from '@emotion/styled';

import theme from './theme';
import { bounce } from './animations';

const Loading = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.darkgray};

  animation: ${bounce} 1s ease infinite;
`;

export default Loading;
