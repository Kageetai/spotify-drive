import { thunk, Thunk } from 'easy-peasy';

import { Injections, Store } from './store';
import { PlaylistFull } from './types/spotify';

export interface Thunks {
  fetchMe: Thunk<Store, undefined, Injections>;
  fetchLibrary: Thunk<Store, undefined, Injections>;
  fetchPlaylists: Thunk<Store, undefined, Injections>;
  fetchPlaylist: Thunk<Store, string, Injections>;
}

const playlistsLimit = 50;
const tracksLimit = 100;

const thunks: Thunks = {
  fetchMe: thunk(async (actions, payload, { injections }) => {
    const res = await injections.spotifyApi.getMe();
    actions.setMe(res.body);
  }),
  fetchLibrary: thunk(async (actions, payload, { injections }) => {
    let { body } = await injections.spotifyApi.getMySavedTracks();

    let tracks = body.items;

    while (body.next) {
      body = (
        await injections.spotifyApi.getMySavedTracks({
          limit: tracksLimit,
          offset: body.offset + tracksLimit,
        })
      ).body;
      tracks = [...tracks, ...body.items];
    }

    actions.setLibrary(tracks);
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
    const { body } = await injections.spotifyApi.getPlaylist(playlistId);
    const playlist: PlaylistFull = { ...body, tracks: body.tracks.items };
    actions.setPlayList({ playlistId: body.description, playlist });

    let tracksBody = { offset: -tracksLimit } as SpotifyApi.PlaylistTrackResponse;

    do {
      tracksBody = (
        await injections.spotifyApi.getPlaylistTracks(playlistId, {
          limit: tracksLimit,
          offset: tracksBody.offset + tracksLimit,
        })
      ).body;

      playlist.tracks = [...playlist.tracks, ...tracksBody.items];
    } while (tracksBody.next);

    actions.setPlayList({ playlistId, playlist });
  }),
};

export default thunks;
