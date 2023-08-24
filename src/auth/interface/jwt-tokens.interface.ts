export interface Tokens {
  accessToken: string;
  refreshToken: string | null;
}

export interface JwtPayload {
  login: string;
  _id: string;
  roles: string[];
}
