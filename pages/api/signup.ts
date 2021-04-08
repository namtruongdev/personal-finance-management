import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';

import { SALT } from '@constants/index';
import db from '@utils/database';

const Signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const { email, username, password, rePassword, rules } = body;

  if (method === 'GET') {
    return res.status(200).end(`Not support GET request!`);
  }

  if (!email || !username || !password || !rePassword || !rules) {
    return res.status(400).json({
      message: 'Thiếu thông tin đăng ký!',
    });
  }

  if (password !== rePassword) {
    return res.status(400).json({
      message: 'Mật khẩu nhập lại không khớp!',
    });
  }

  const usersRef = db.collection('users');
  const checkEmail = await usersRef.where('email', '==', email).get();

  if (!checkEmail.empty) {
    return res.status(400).json({ message: 'Email đã được sử dụng!' });
  }

  const checkUsername = await usersRef.where('username', '==', username).get();

  if (!checkUsername.empty) {
    return res.status(400).json({ message: 'Tên người dùng đã tồn tại!' });
  }

  const passwordHash = await hash(password, SALT);

  const payload: User = {
    email,
    username,
    password: passwordHash,
    createdAt: new Date().toJSON(),
  };
  const { id } = await db.collection('users').add(payload);

  return res.status(200).json({ id, message: 'Đăng ký thành công!' });
};

export default Signup;
