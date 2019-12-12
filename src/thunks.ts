import { thunk, Thunk } from 'easy-peasy';

import { Injections, Store } from './store';

export interface Thunks {
  fetchMe: Thunk<Store, undefined, Injections>;
  fetchPlaylists: Thunk<Store, undefined, Injections>;
  fetchPlaylist: Thunk<Store, string, Injections>;
}

const playlistsLimit = 50;

const thunks: Thunks = {
  fetchMe: thunk(async (actions, payload, { injections }) => {
    const res = await injections.spotifyApi.getMe();
    actions.setMe(res.body);
  }),
  fetchPlaylists: thunk(async (actions, payload, { injections }) => {
    try {
      let { body } = await injections.spotifyApi.getUserPlaylists({
        limit: playlistsLimit,
        offset: 0,
      });
      let playlists = body.items;

      while (body.next) {
        body = (
          await injections.spotifyApi.getUserPlaylists({
            limit: playlistsLimit,
            offset: body.offset + playlistsLimit,
          })
        ).body;
        playlists = [...playlists, ...body.items];
      }

      actions.setPlaylists(playlists);
    } catch (e) {
      actions.setError(e);
    }
  }),
  fetchPlaylist: thunk(async (actions, playlistId, { injections }) => {
    const res = await injections.spotifyApi.getPlaylist(playlistId);
    actions.setSelectedPlaylist(res.body);
  }),
};

export default thunks;
