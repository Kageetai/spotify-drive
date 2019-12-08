import React from 'react';

import StyledPlaylists from '../styled/Playlists';
import { useStoreActions, useStoreState } from '../store';

import Playlist from './Playlist';

const Playlists: React.FC = () => {
  const playlists = useStoreState((state) => state.playlists);
  const selectedPlaylist = useStoreState((state) => state.selectedPlaylist);
  const fetchPlaylists = useStoreActions((actions) => actions.fetchPlaylists);
  const fetchPlaylist = useStoreActions((actions) => actions.fetchPlaylist);

  React.useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return playlists ? (
    selectedPlaylist ? (
      <Playlist />
    ) : (
      <StyledPlaylists>
        {playlists.map((playlist) => (
          <li
            key={playlist.id}
            onClick={() => fetchPlaylist(playlist.id)}
          >
            {playlist.name}
          </li>
        ))}
      </StyledPlaylists>
    )
  ) : null;
};

export default Playlists;
