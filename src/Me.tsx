import React from 'react';

import spotifyApi from './utils/spotify';

const Me: React.FC = () => {
  const [me, setMe] = React.useState<SpotifyApi.CurrentUsersProfileResponse>();

  React.useEffect(() => {
    spotifyApi.getMe().then((res) => setMe(res.body));
  }, []);

  return me ? (
    <div style={{ textTransform: 'capitalize' }}>
      <p>{me.images && <img src={me.images[0].url} alt="" />}</p>

      <a href={me.uri}>{me.display_name}</a>

      <p>
        {me.product}, {me.followers && me.followers.total} Followers
      </p>
    </div>
  ) : null;
};

export default Me;
