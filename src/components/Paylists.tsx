import React from 'react';

import List from '../styled/List';
import { useStoreActions, useStoreState } from '../store';

import Playlist from './Playlist';

const Playlists: React.FC = () => {
  const playlists = useStoreState((state) => state.playlists);
  const selectedPlaylist = useStoreState((state) => state.selectedPlaylist);
  const fetchLibrary = useStoreActions((actions) => actions.fetchLibrary);
  const fetchPlaylists = useStoreActions((actions) => actions.fetchPlaylists);
  const fetchPlaylist = useStoreActions((actions) => actions.fetchPlaylist);

  React.useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return playlists ? (
    selectedPlaylist ? (
      <Playlist playlist={selectedPlaylist} />
    ) : (
      <List>
        <li onClick={() => fetchLibrary()}>My Library</li>

        {playlists.map((playlist) => (
          <li key={playlist.id} onClick={() => fetchPlaylist(playlist.id)}>
            {playlist.name}
          </li>
        ))}
      </List>
    )
  ) : null;
};

export default Playlists;
