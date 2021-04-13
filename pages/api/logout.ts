import { SET_COOKIE_OPTIONS } from '@constants/jwt';
import { setCookie } from '@utils/auth';
import { NextApiRequest, NextApiResponse } from 'next';

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
  ]);

  return res.status(200).json({ message: 'Đăng xuất thành công' });
};
export default Logout;
