import React from 'react';
import { useStoreActions } from '../store';

import { PlaylistFull } from '../types/spotify';
import StyledPlaylist from '../styled/Playlist';
import List from '../styled/List';

interface Props {
  playlist: PlaylistFull;
}

const Playlist: React.FC<Props> = ({ playlist }: Props) => {
  const setSelectedPlaylist = useStoreActions((actions) => actions.setSelectedPlaylist);

  return (
    <StyledPlaylist>
      <button onClick={() => setSelectedPlaylist(null)}>&larr; back</button>

      <h2>
        <a href={playlist.uri}>{playlist.name}</a>
      </h2>

      <img src={playlist.images[0].url} alt="playlist" />

      <List>
        {playlist.tracks?.map((track) => (
          <li key={track.track.id}>
            <a href={track.track.uri}>
              {track.track.artists[0].name} - {track.track.name}
            </a>
          </li>
        ))}
      </List>
    </StyledPlaylist>
  );
};

export default Playlist;
