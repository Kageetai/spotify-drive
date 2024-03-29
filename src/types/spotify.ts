export interface SpotifyAuth {
  accessToken: string;
  scope: string;
  expiresIn: string;
  refreshToken: string;
}

export interface SpotifyAuthVanilla {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: string;
  refresh_token: string;
}

export interface ExternalUrl {
  spotify: string;
}

export interface Image {
  height?: number;
  url: string;
  width?: number;
}

interface Followers {
  href: null;
  total: number;
}

export interface SpotifyUser {
  birthdate: string;
  country: string;
  email: string;
  product: string;
  display_name?: string;
  external_urls: ExternalUrl;
  followers?: Followers;
  href: string;
  id: string;
  images?: Image[];
  type: 'user';
  uri: string;
}

interface SpotifyUserPublic {
  display_name?: string;
  external_urls: ExternalUrl;
  followers?: Followers;
  href: string;
  id: string;
  images?: Image[];
  type: 'user';
  uri: string;
}

interface PlaylistBase {
  collaborative: boolean;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: SpotifyUserPublic;
  public: boolean | null;
  snapshot_id: string;
  type: 'playlist';
  uri: string;
}

export interface PlaylistSimplified extends PlaylistBase {
  tracks: {
    href: string;
    total: number;
  };
}

export interface PlaylistFull extends PlaylistBase {
  description: string | null;
  followers: Followers;
  tracks: PlaylistTrack[];
}

export type Playlist = PlaylistSimplified | PlaylistFull;

export interface PlaylistTrack {
  added_at: string;
  added_by?: SpotifyUserPublic;
  is_local?: boolean;
  track: TrackFull;
}

interface TrackFull extends TrackSimplified {
  album: AlbumSimplified;
  popularity: number;
}

interface TrackSimplified {
  artists: ArtistSimplified[];
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: TrackLink;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

export interface ArtistSimplified {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface AlbumSimplified {
  album_type: string;
  available_markets?: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  type: 'album';
  uri: string;
}

interface TrackLink {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  type: 'track';
  uri: string;
}
