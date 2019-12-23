import React from 'react';

import { Container } from '../styled/App';
import { useStoreActions, useStoreState } from '../store';
import List from '../styled/List';
import Loading from '../styled/Loading';

const Library = () => {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const isLoading = useStoreState((state) => state.isLoading);
  const library = useStoreState((state) => state.library);
  const fetchLibrary = useStoreActions((actions) => actions.fetchLibrary);

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchLibrary();
    }
  }, [isLoggedIn, fetchLibrary]);

  if (isLoading) {
    return <Loading>Loading Library Tracks</Loading>;
  }

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
