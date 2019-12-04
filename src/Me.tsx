import React from 'react';

import { useStoreActions, useStoreState } from './store';

const Me: React.FC = () => {
  const me = useStoreState((state) => state.me);
  const fetchMe = useStoreActions((actions) => actions.fetchMe);

  React.useEffect(() => {
    fetchMe();
  }, [fetchMe]);

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
