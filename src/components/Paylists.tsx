import React from 'react';
import { Link } from 'react-router-dom';

import List, { Thumb } from '../styled/List';
import { useStoreActions, useStoreState } from '../store';
import Loading from '../styled/Loading';

const Playlists: React.FC = () => {
  const playlists = useStoreState((state) => state.playlists);
  const isLoading = useStoreState((state) => state.isLoading);
  const fetchPlaylists = useStoreActions((actions) => actions.fetchPlaylists);

  React.useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  if (!playlists && isLoading) {
    return <Loading>Loading Playlists</Loading>;
  }

  return (
    <List>
      <li>
        <Link to="/library">My Library</Link>
      </li>

      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <Link to={'/' + playlist.id}>
            <Thumb src={playlist.images[0]?.url} />

            {playlist.name}
          </Link>
        </li>
      ))}
    </List>
  );
};

export default Playlists;
