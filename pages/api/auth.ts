import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '@utils/database/index';

/* JWT secret key */
// const KEY = process.env.JWT_KEY;

/* Users collection sample */

export default async (req, res) => {
  const { email, password } = req.body;
  const listUsers = await db.collection('users').get();
  const usersData = listUsers.docs.map((user) => user.data());
  /* Get Post Data */
  /* Any how email or password is blank */
  if (!email || !password) {
    res.status(400).json({
      status: 'error',
      error: 'Request missing username or password',
    });
  }
  /* Check user email in database */
  const users = usersData.find((user) => user.email === email);
  /* Check if exists */

  if (!users) {
    /* Send error with message */
    res
      .status(400)
      .json({ status: 'error', mesage: 'Tài khoản không tồn tại!' });
  }
  /* Variables checking */
  if (users) {
    const userId = users.id;
    const userName = users.name;
    const userEmail = users.email;
    const userPassword = users.password;
    const userCreate = users.created;
    /* Check and compare password */

    bcrypt.compare(password, userPassword).then((isMatch) => {
      /* User matched */
      if (isMatch) {
        /* Create JWT Payload */
        const payload = {
          id: userId,
          email: userEmail,
          name: userName,
          create: userCreate,
        };
        /* Sign token */
        jwt.sign(
          payload,
          'haha',
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            /* Send succes with token */
            res.status(200).json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        /* Send error with message */

        res.status(400).json({ status: 'error', message: 'Sai mật khẩu!' });
      }
    });
  }
};
