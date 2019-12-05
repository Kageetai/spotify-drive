import { thunk, Thunk } from 'easy-peasy';

import { Injections, Store } from './store';

export interface Thunks {
  fetchMe: Thunk<Store, undefined, Injections>;
}

const thunks: Thunks = {
  fetchMe: thunk(async (actions, payload, { injections }) => {
    const res = await injections.spotifyApi.getMe();
    actions.setMe(res.body);
  }),
};

export default thunks;
