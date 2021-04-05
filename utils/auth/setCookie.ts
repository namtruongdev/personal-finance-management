import cookie from 'cookie';
import { SET_COOKIE_OPTIONS, REFRESH_TOKEN_EXPIRY } from '@constants/index';

export const setCookie = ({
  name,
  value,
  options = SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
}: {
  name: string;
  value: string;
  options?: cookie.CookieSerializeOptions;
}) => cookie.serialize(name, value, options);
