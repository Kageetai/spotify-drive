import React from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById, useStoreActions, useStoreState } from '../store';

const Playlist: React.FC = () => {
  const { playlistId } = useParams();
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const playlist = useStoreState((state) =>
    playlistId ? getPlaylistById(state, playlistId) : null,
  );
  const fetchPlaylist = useStoreActions((actions) => actions.fetchPlaylist);

  React.useEffect(() => {
    if (isLoggedIn && playlistId) {
      fetchPlaylist(playlistId);
    }
  }, [isLoggedIn, playlistId, fetchPlaylist]);

  return playlist ? <span>{playlist.name}</span> : null;
};

export default Playlist;
