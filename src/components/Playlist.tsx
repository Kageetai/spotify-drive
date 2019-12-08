import React from 'react';
import { useStoreActions } from '../store';

import { Playlist as PlaylistType } from '../types/spotify';
import StyledPlaylist from '../styled/Playlist';

interface Props {
  playlist: PlaylistType;
}

const Playlist: React.FC<Props> = ({ playlist }: Props) => {
  const setSelectedPlaylist = useStoreActions(
    (actions) => actions.setSelectedPlaylist,
  );

  return (
    <StyledPlaylist>
      <h2>
        <a href={playlist.uri}>{playlist.name}</a>

        <button onClick={() => setSelectedPlaylist(null)}>X</button>
      </h2>

      <img src={playlist.images[0].url} alt="playlist" />
    </StyledPlaylist>
  );
};

export default Playlist;