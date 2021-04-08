import {
  JWT_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  SALT,
  SET_COOKIE_OPTIONS,
} from '@constants/jwt';
import { setCookie } from '@utils/auth';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';
import { v4 as uuidv4 } from 'uuid';
import db from '@utils/database/index';

const secret = process.env.JWT_SECRET;
const SigninPlugin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method === 'GET') {
    return res.end('hihi');
  }
  const infor = await jwt.getToken({ req, secret });
  const { sub, name } = infor;
  const subString = sub.toString();
  const doc = await db.collection('users').doc(subString).get();
  const claims = {
    id: subString,
    userName: name,
  };
  const token = sign(claims, secret, { expiresIn: '15m' });
  const refreshToken = uuidv4();
  const refreshTokenHash = await hash(refreshToken, SALT);
  res.setHeader('Set-Cookie', [
    setCookie({
      name: 'auth',
      value: token,
      options: SET_COOKIE_OPTIONS({ maxAge: JWT_TOKEN_EXPIRY }),
    }),
    setCookie({
      name: 'user_id',
      value: subString,
      options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
    }),
    setCookie({
      name: 'refresh_token',
      value: refreshToken,
      options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
    }),
  ]);
  const currentRef = db.collection('users');
  // const map = { 'id': subString, 'name': 'New Data' };
  if (!doc.exists) {
    currentRef.doc(subString).set({
      ...infor,
      username: name,
    });
    await db.collection('users').doc(subString).update({
      refreshTokenHash,
    });
    return res.status(200).json({});
  }
  await db.collection('users').doc(subString).update({
    refreshTokenHash,
  });
  return res.status(200).json({
    message: 'Đăng nhập thành công!',
    status: 'OK',
  });
};

export default SigninPlugin;
