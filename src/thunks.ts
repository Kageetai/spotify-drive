import { thunk, Thunk } from 'easy-peasy';

import { Store } from './store';
import spotifyApi from './utils/spotify';

export interface Thunks {
  fetchMe: Thunk<Store>;
}

const thunks: Thunks = {
  fetchMe: thunk(async (actions) => {
    const res = await spotifyApi.getMe();
    actions.setMe(res.body);
  }),
};

export default thunks;
