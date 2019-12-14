import React from 'react';
import { useParams } from 'react-router-dom';

const Playlist: React.FC = () => {
  const { playlistId } = useParams();

  return <span>{playlistId}</span>;
};

export default Playlist;
