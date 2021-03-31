import bcrypt from 'bcryptjs';
import db from '@utils/database/index';

export default async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(12);
    const users = await db.collection('users').get();
    const usersData = users.docs.map((user) => user.data());

    if (usersData.some((entry) => entry.email === email)) {
      res
        .status(200)
        .json({ error: 'ERROR', message: 'Email đã được đăng kí!' });
    } else {
      const hash = bcrypt.hashSync(password, salt);
      const data = { ...req.body, password: hash };
      const { id } = await db.collection('users').add({
        ...data,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
};
