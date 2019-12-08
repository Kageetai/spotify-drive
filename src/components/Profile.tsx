import React from 'react';

import { useStoreActions, useStoreState } from '../store';
import StyledProfile from '../styled/Profile';

const Profile: React.FC = () => {
  const me = useStoreState((state) => state.me);
  const fetchMe = useStoreActions((actions) => actions.fetchMe);

  React.useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return me ? (
    <StyledProfile>
      {me.images && <img src={me.images[0].url} alt="" />}

      <div>
        <h3>
          <a href={me.uri}>{me.display_name}</a>
        </h3>

        <p>
          {me.product}, {me.followers && me.followers.total} Followers
        </p>
      </div>
    </StyledProfile>
  ) : null;
};

export default Profile;
