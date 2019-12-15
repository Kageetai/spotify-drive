import React from 'react';

import { Container } from '../styled/App';
import { useStoreActions, useStoreState } from '../store';
import List from '../styled/List';

const Library = () => {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const library = useStoreState((state) => state.library);
  const fetchLibrary = useStoreActions((actions) => actions.fetchLibrary);

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchLibrary();
    }
  }, [isLoggedIn, fetchLibrary]);

  return (
    <Container>
      <h2>Library</h2>

      <List>
        {library?.map((track) => (
          <li key={track.track.id}>{track.track.name}</li>
        ))}
      </List>
    </Container>
  );
};
export default Library;
