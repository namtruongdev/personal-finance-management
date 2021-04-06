import { SALT } from '@constants/index';
import { setCookie } from '@utils/auth';
import db from '@utils/database/index';
import bcrypt, { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const secret = process.env.JWT_SECRET;

const Signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === 'GET') {
    return res.end('Not support GET method!');
  }

  const { username, password } = body;
  // khai báo user mặc định .
  let user = {
    id: '',
    email: '',
    password: '',
    refreshTokens: { expiry: '', hash: '' },
  };
  // 3 biến
  const refreshToken = uuidv4();
  // const refreshTokenExpiry = new Date(
  //   Date.now() + REFRESH_TOKEN_EXPIRY * 1000
  // ).toJSON();

  // const genHash = await hash(password, SALT);
  const refreshTokenHash = await hash(refreshToken, SALT);

  // check người dùng có đăng nhập đủ k?
  if (!username || !password) {
    return res.status(400).json({
      status: 'error',
      error: 'Request missing username or password',
    });
  }

  await db
    .collection('users')
    .where('username', '==', username)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        user = { ...user, ...doc.data(), id: doc.id };
      });
    })
    .catch((error) => {
      // console.log(error)
    });
  // sửa refreshTokenHash trong dataBase
  await db
    .collection('users')
    .doc(user.id)
    .set({
      ...user,
      refreshTokens: {
        ...user.refreshTokens,
        hash: refreshTokenHash,
      },
    })
    .then(() => {
      // console.log("Document successfully written!");
    })
    .catch((error) => {
      // console.error("Error writing document: ", error);
    });

  /* Check user email in database */
  // check xem có id k?
  if (user.id !== '') {
    // so sánh pass từ đăng nhập và data
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // tạo token
      const token = await sign(user, secret, { expiresIn: '1m' });
      res.setHeader('Set-Cookie', [
        setCookie({ name: 'auth', value: token }),
        setCookie({ name: 'user_id', value: user.id }),
        setCookie({ name: 'refresh_token', value: refreshToken }),
      ]);
      // res.setHeader(
      //   'Set-Cookie',
      //   [`auth=${token}`, `user-id=${user.id}`]

      // );

      // res.setHeader(
      //   'Set-Cookie',
      //   cookie.serialize('auth', token, {
      //     httpOnly: true,
      //     secure: process.env.NODE_ENV !== 'development',
      //     sameSite: 'strict',
      //     maxAge: 60,
      //     path: '/',
      //   })
      // );

      return res.status(200).json({
        status: 'success',
        token,
      });
    }
    // không match
    return res.status(400).json({ status: 'error', message: 'Sai mật khẩu!' });
  }

  return res
    .status(400)
    .json({ status: 'error', message: 'Tài khoản không tồn tại!' });
};

export default Signin;
