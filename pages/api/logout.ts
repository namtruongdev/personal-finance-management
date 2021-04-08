import { NextApiRequest, NextApiResponse } from 'next';
import { SET_COOKIE_OPTIONS } from '@constants/jwt';
import { setCookie } from '@utils/auth';

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Set-Cookie', [
    setCookie({
      name: 'auth',
      value: '',
      options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
    }),
    setCookie({
      name: 'user_id',
      value: '',
      options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
    }),
    setCookie({
      name: 'refresh_token',
      value: '',
      options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
    }),
    setCookie({
      name: 'next-auth.session-token',
      value: '',
      options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
    }),
  ]);

  return res.status(205).json({
    message: 'OK',
  });
};

export default Logout;
