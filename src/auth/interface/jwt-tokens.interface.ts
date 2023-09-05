export interface Tokens {
  accessToken: string;
  refreshToken: string | null;
}

export interface JwtPayload {
  login: string;
  sub: string;
  roles: string[];
}
