import { thunk, Thunk } from 'easy-peasy';

import { Injections, Store } from './store';

export interface Thunks {
  fetchMe: Thunk<Store, undefined, Injections>;
  fetchPlaylists: Thunk<Store, undefined, Injections>;
}

const limit = 50;

const thunks: Thunks = {
  fetchMe: thunk(async (actions, payload, { injections }) => {
    const res = await injections.spotifyApi.getMe();
    actions.setMe(res.body);
  }),
  fetchPlaylists: thunk(async (actions, payload, { injections }) => {
    let { body } = await injections.spotifyApi.getUserPlaylists({
      limit,
      offset: 0,
    });
    let playlists = body.items;

    while (body.next) {
      body = (
        await injections.spotifyApi.getUserPlaylists({
          limit,
          offset: body.offset + limit,
        })
      ).body;
      playlists = [...playlists, ...body.items];
    }

    actions.setPlaylists(playlists);
  }),
};

export default thunks;
