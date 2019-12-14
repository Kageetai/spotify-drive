import React from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById, useStoreActions, useStoreState } from '../store';
import { Container } from '../styled/App';
import StyledPlaylist from '../styled/Playlist';
import List from '../styled/List';
import { PlaylistFull } from '../types/spotify';

const Playlist: React.FC = () => {
  const { playlistId } = useParams();
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const playlist = useStoreState((state) =>
    getPlaylistById(state, playlistId || ''),
  ) as PlaylistFull;
  const fetchPlaylist = useStoreActions((actions) => actions.fetchPlaylist);

  React.useEffect(() => {
    if (isLoggedIn && playlistId) {
      fetchPlaylist(playlistId);
    }
  }, [isLoggedIn, playlistId, fetchPlaylist]);

  if (!isLoggedIn || !playlistId || !playlist) {
    return null;
  }

  const image = playlist.images.length && playlist.images[0];

  console.log(playlist);

  return playlist ? (
    <Container>
      <StyledPlaylist>
        <h2>
          {image && (
            <img src={image.url} alt={playlist.name} width={image.width} height={image.height} />
          )}
          {playlist.name}
        </h2>

        <List>
          {playlist?.tracks.map((track) => (
            <li key={track.track.id}>{track.track.name}</li>
          ))}
        </List>
      </StyledPlaylist>
    </Container>
  ) : null;
};

export default Playlist;
