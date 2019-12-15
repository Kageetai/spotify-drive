import React from 'react';
import { Link } from 'react-router-dom';

import List from '../styled/List';
import { useStoreActions, useStoreState } from '../store';

const Playlists: React.FC = () => {
  const playlists = useStoreState((state) => state.playlists);
  const fetchPlaylists = useStoreActions((actions) => actions.fetchPlaylists);

  React.useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return playlists ? (
    <List>
      <li>
        <Link to="/library">My Library</Link>
      </li>

      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <Link to={'/' + playlist.id}>{playlist.name}</Link>
        </li>
      ))}
    </List>
  ) : null;
};

export default Playlists;
