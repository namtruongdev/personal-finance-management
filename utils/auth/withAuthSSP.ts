import { SALT } from '@constants/index';
// eslint-disable-next-line import/no-cycle
import { setCookie } from '@utils/auth';
import db from '@utils/database/index';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { v4 as uuidv4 } from 'uuid';

const secret = process.env.JWT_SECRET;

export const withAuthSSP = (getServerSideProps?: GetServerSideProps) => async (
  ctx: GetServerSidePropsContext
) => {
  const cookie = ctx?.req?.cookies;
  const res = ctx?.res;
  // const body =ctx.req.body;
  // const { username, password } = body;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { token, user_id, refresh_token } = cookie;
  // console.log(token, 'token')
  let user = {
    id: '',
    email: '',
    password: '',
    refreshTokens: { expiry: '', hash: '' },
  };
  if (user_id) {
    await db
      .collection('users')
      .where('id', '==', user_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          user = { ...user, ...doc.data(), id: doc.id };
        });
      })
      .catch((error) => {
        // console.log(error)
      });
  }

  if (!user_id || !refresh_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }
  if (user_id === user.id && refresh_token === user.refreshTokens.hash) {
    if (!token) {
      const newToken = await sign(user, secret, { expiresIn: '1m' });
      const refreshToken = uuidv4();
      const refreshTokenHash = await hash(refreshToken, SALT);
      res.setHeader('Set-Cookie', [
        setCookie({ name: 'auth', value: newToken }),
        setCookie({ name: 'user_id', value: user.id }),
        setCookie({ name: 'refresh_token', value: refreshToken }),
      ]);
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
    }
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
  // return 0;

  // const user = verify(token, secret, async (err, decoded) => {
  //   console.log(err, 'loi');

  //   if (!err && decoded) {
  //     // console.log(user);
  //   }
  // });

  return {
    props: {
      user: {},
    },
  };
};
