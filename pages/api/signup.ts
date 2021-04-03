import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt';
import db from '@utils/database/index';

const Signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method === 'GET') {
    return res.end('Not support GET request!');
  }

  const { email, password } = body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Thiếu thông tin đăng ký!',
    });
  }

  const SALT = 10;
  const users = await db.collection('users').get();
  const usersData = users.docs.map((user) => user.data());

  if (usersData.some((entry) => entry.email === email)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Email đã được sử dụng!' });
  }
  const genHash = await hash(password, SALT);

  const data = { ...req.body, password: genHash };
  const { id } = await db.collection('users').add({
    ...data,
    createdAt: new Date().toJSON(),
  });

  return id && res.status(200).json({ status: 'success' });
};

export default Signup;
