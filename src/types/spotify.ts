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
  href: string;
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

export interface Playlist {
  collaborative: boolean;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: SpotifyUserPublic;
  public: boolean;
  snapshot_id: string;
  type: 'playlist';
  uri: string;
  tracks: {
    href: string;
    total: number;
  };
}
