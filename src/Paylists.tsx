import React from 'react';

import { useStoreActions, useStoreState } from './store';

const Playlists: React.FC = () => {
  const playlists = useStoreState((state) => state.playlists);
  const fetchPlaylists = useStoreActions((actions) => actions.fetchPlaylists);

  React.useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return playlists ? (
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>{playlist.name}</li>
      ))}
    </ul>
  ) : null;
};

export default Playlists;
