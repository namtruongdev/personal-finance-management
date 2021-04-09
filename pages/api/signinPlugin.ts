import { JWT_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, SALT, SET_COOKIE_OPTIONS } from '@constants/jwt';
import { setCookie } from '@utils/auth';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';
import { v4 as uuidv4 } from 'uuid';
import db from '@utils/database/index';
import { getSession } from 'next-auth/client'

const secret = process.env.JWT_SECRET;
const SigninPlugin = async (
  req: NextApiRequest, res: NextApiResponse
) => {
  const { body, method } = req;
  if (method === "GET") {
    return res.end('hihi')
  }
  const session = await getSession({ req });
  console.log(session, 'session')
  console.log(body, 'body')
  const infor = await jwt.getToken({ req, secret })
  console.log(infor, 'token')
  const { sub, name, email } = infor;
  const subString = sub.toString();
  console.log(subString, name, email)
  const doc = await db.collection('users').doc(subString).get();
  const user = doc.data();
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
  const currentRef = db.collection('users')
  // const map = { 'id': subString, 'name': 'New Data' };
  console.log(doc.exists)
  if (!doc.exists) {
    currentRef.doc(subString).set({
      ...infor, username: name
    });
    console.log('ko')
    await db.collection('users').doc(subString).update({
      refreshTokenHash,
    }
    );
    return res.status(200).json({})

  }
  await db.collection('users').doc(subString).update({
    refreshTokenHash,
  });
  console.log(user)
  // return res.status(200).json({ message: 'cuoi' })
  return res.status(200).json({
    message: 'Đăng nhập thành công!',
    status: 'OK',
  });
};

export default SigninPlugin;
