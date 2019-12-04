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

export interface SpotifyUser{
  birthdate: string,
  country: string,
  email: string,
  product: string
  display_name?: string,
  external_urls: {
    spotify: string
  },
  followers?: {
    href: string,
    total: number
  },
  href: string,
  id: string,
  images?: {
    height?: number,
    url: string,
    width?: number
  }[],
  type: "user",
  uri: string
}
