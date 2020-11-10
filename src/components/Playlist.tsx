import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { getPlaylistById, useStoreActions, useStoreState } from '../store';
import { Container } from '../styled/App';
import StyledPlaylist from '../styled/Playlist';
import List from '../styled/List';
import { Playlist as PlaylistType, PlaylistFull } from '../types/spotify';
import Loading from '../styled/Loading';
import AButton from '../styled/AButton';

const Playlist: React.FC = () => {
  const { playlistId }: { playlistId: string } = useParams();
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  const isLoading = useStoreState((state) => state.isLoading);
  const playlist: PlaylistType = useStoreState((state) =>
    getPlaylistById(state, playlistId || ''),
  ) as PlaylistFull;
  const fetchPlaylist = useStoreActions((actions) => actions.fetchPlaylist);

  React.useEffect(() => {
    if (isLoggedIn && playlistId) {
      fetchPlaylist(playlistId);
    }
  }, [isLoggedIn, playlistId, fetchPlaylist]);

  if (!isLoggedIn || !playlistId) {
    return null;
  }

  if (isLoading) {
    return <Loading>Loading Playlist Tracks</Loading>;
  }

  const image = playlist && playlist.images.length && playlist.images[0];

  return playlist ? (
    <Container>
      <Link to="/" component={AButton}>
        &laquo; Back
      </Link>

      <StyledPlaylist>
        <h2>
          {image && (
            <img src={image.url} alt={playlist.name} width={image.width} height={image.height} />
          )}
          {playlist.name}
        </h2>

        {playlist.tracks.length && (
          <List>
            {playlist?.tracks.map((track) => (
              <li key={track.track.id}>{track.track.name}</li>
            ))}
          </List>
        )}
      </StyledPlaylist>
    </Container>
  ) : null;
};

export default Playlist;
