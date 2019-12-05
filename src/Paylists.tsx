import React from 'react';

import { useStoreActions, useStoreState } from './store';

const Playlists: React.FC = () => {
  const playlists = useStoreState((state) => state.playlists);
  const fetchPlaylists = useStoreActions((actions) => actions.fetchPlaylists);

  React.useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  console.log(playlists);

  return null;
};

export default Playlists;
