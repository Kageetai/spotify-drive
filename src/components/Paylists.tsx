import React from 'react';

import StyledPlaylists from '../styled/Playlists';

import { useStoreActions, useStoreState } from '../store';

const Playlists: React.FC = () => {
  const playlists = useStoreState((state) => state.playlists);
  const fetchPlaylists = useStoreActions((actions) => actions.fetchPlaylists);
  const setSelectedPlaylist = useStoreActions(
    (actions) => actions.setSelectedPlaylist,
  );

  React.useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return playlists ? (
    <StyledPlaylists>
      {playlists.map((playlist) => (
        <li key={playlist.id} onClick={() => setSelectedPlaylist(playlist.id)}>
          {playlist.name}
        </li>
      ))}
    </StyledPlaylists>
  ) : null;
};

export default Playlists;
