import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '@utils/auth';
import { SET_COOKIE_OPTIONS, JWT_TOKEN_EXPIRY } from '@constants/index';

const SetCookie = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === 'GET') {
    return res.status(200).end('Not support GET method!');
  }

  const { auth, refresh_token: refreshToken, user_id: userId } = body;
  res.setHeader('Set-Cookie', [
    setCookie({
      name: 'auth',
      value: auth,
      options: SET_COOKIE_OPTIONS({ maxAge: JWT_TOKEN_EXPIRY }),
    }),
    setCookie({ name: 'refresh_token', value: refreshToken }),
    setCookie({ name: 'user_id', value: userId }),
  ]);
  return res.status(200).json({
    message: 'OK',
  });
};

export default SetCookie;
