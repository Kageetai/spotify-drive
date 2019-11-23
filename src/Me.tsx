import React from 'react';

import { spotifyApi } from './utils/spotify';

const Me: React.FC = () => {
  const [me, setMe] = React.useState<SpotifyApi.CurrentUsersProfileResponse>();

  React.useEffect(() => {
    spotifyApi.getMe().then((res) => setMe(res.body));
  }, []);

  return me ? <span>{me.display_name}</span> : null;
};

export default Me;
