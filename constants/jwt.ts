export const SALT = 10;
export const JWT_TOKEN_EXPIRY = 900;
export const REFRESH_TOKEN_EXPIRY = 604800;
export const SET_COOKIE_OPTIONS = ({
  maxAge = JWT_TOKEN_EXPIRY,
}: {
  maxAge?: number;
}) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'strict' as 'strict',
  maxAge,
  path: '/',
});
