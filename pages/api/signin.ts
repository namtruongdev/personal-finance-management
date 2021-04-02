import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '@utils/database/index';

const secret = process.env.JWT_SECRET;

const Signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const listUsers = await db.collection('users').get();

  const usersData = listUsers.docs.map((user) => user.data());

  if (!email || !password) {
    res.status(400).json({
      status: 'error',
      error: 'Request missing username or password',
    });
  }

  /* Check user email in database */
  const payload = usersData.find((user) => user.email === email);

  if (!payload) {
    /* Send error with message */
    res.status(400).json({ status: '400', mesage: 'Tài khoản không tồn tại!' });
  }
  /* Variables checking */
  if (payload) {
    const isMatch = await bcrypt.compare(password, payload.password);

    if (isMatch) {
      /* Sign token */
      const token = jwt.sign(payload, secret, { expiresIn: '1m' });

      res.status(200).json({
        status: 'success',
        token: `Bearer ${token}`,
      });
    } else {
      res.status(400).json({ status: 'error', message: 'Sai mật khẩu!' });
    }
  }
};

export default Signin;
