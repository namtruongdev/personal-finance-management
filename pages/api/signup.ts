import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { SALT, REFRESH_TOKEN_EXPIRY } from '@constants/index';
import { setCookie } from '@utils/auth';
import db from '@utils/database';

const Signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const { email, username, password } = body;

  if (method === 'GET') {
    return res.end(`Not support GET request!`);
  }
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Thiếu thông tin đăng ký!',
    });
  }

  const users = await db.collection('users').get();
  const usersData = users.docs.map((user) => user.data());

  if (usersData.some((entry) => entry.email === email)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Email đã được sử dụng!' });
  }

  const refreshToken = uuidv4();
  const refreshTokenExpiry = new Date(
    Date.now() + REFRESH_TOKEN_EXPIRY * 1000
  ).toJSON();

  const genHash = await hash(password, SALT);
  const refreshTokenHash = await hash(refreshToken, SALT);

  const payload: User = {
    email,
    username,
    password: genHash,
    createdAt: new Date().toJSON(),
    refreshTokens: [
      {
        hash: refreshTokenHash,
        expiry: refreshTokenExpiry,
      },
    ],
  };
  const { id } = await db.collection('users').add(payload);

  res.setHeader(
    'Set-Cookie',
    setCookie({ name: 'refresh-token', value: refreshToken })
  );
  return id && res.status(200).json({ status: 'success' });
};

export default Signup;
