import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import { sign } from 'jsonwebtoken';
import db from '@utils/database/index';

const secret = process.env.JWT_SECRET;

const Signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === 'GET') {
    return res.end('Not support GET method!');
  }

  const { email, password } = body;
  const users = await db.collection('users').get();

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      error: 'Request missing username or password',
    });
  }

  /* Check user email in database */
  // const payload = usersData.find((user) => user.email === email);

  // if (!payload) {
  //   /* Send error with message */
  //   return res
  //     .status(400)
  //     .json({ status: '400', mesage: 'Tài khoản không tồn tại!' });
  // }

  // const isMatch = await bcrypt.compare(password, payload.password);

  // if (isMatch) {
  //   /* Sign token */
  //   // const token = sign(payload, secret, { expiresIn: '1m' });

  //   res.setHeader(
  //     'Set-Cookie',
  //     cookie.serialize('auth', token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV !== 'development',
  //       sameSite: 'strict',
  //       maxAge: 60,
  //       path: '/',
  //     })
  //   );

  //   // return res.status(200).json({
  //   //   status: 'success',
  //   //   token,
  //   // });
  // }

  return res.status(400).json({ status: 'error', message: 'Sai mật khẩu!' });
};

export default Signin;
