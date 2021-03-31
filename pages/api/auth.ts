import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as data from '../../db.json';

/* JWT secret key */
// const KEY = process.env.JWT_KEY;

/* Users collection sample */

const listUser = data.users;

export default (req, res) => {
  let resolve;
  const { method } = req;
  try {
    switch (method) {
      case 'POST': {
        const { email, password } = req.body;
        /* Get Post Data */
        /* Any how email or password is blank */
        if (!email || !password) {
          resolve = res.status(400).json({
            status: 'error',
            error: 'Request missing username or password',
          });
        }
        /* Check user email in database */
        const users = listUser.find((user) => user.email === email);
        /* Check if exists */
        if (!users) {
          /* Send error with message */
          resolve = res
            .status(400)
            .json({ status: 'error', error: 'User Not Found' });
        }
        /* Variables checking */
        if (users) {
          const userId = users.id;
          const userEmail = users.email;
          const userPassword = users.password;

          /* Check and compare password */

          bcrypt.compare(password, userPassword).then((isMatch) => {
            /* User matched */
            if (isMatch) {
              /* Create JWT Payload */
              const payload = {
                id: userId,
                email: userEmail,
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
                  resolve = res.status(200).json({
                    success: true,
                    token: `Bearer ${token}`,
                  });
                }
              );
            } else {
              /* Send error with message */

              resolve = res
                .status(400)
                .json({ status: 'error', error: 'Password incorrect' });
            }
          });
        }
        break;
      }

      default:
        break;
    }
  } catch (error) {
    // error
  }
  return resolve;
};
