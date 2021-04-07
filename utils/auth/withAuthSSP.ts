import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { SALT } from '@constants/index';
import db from '@utils/database';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { setCookie } from './setCookie';

const secret = process.env.JWT_SECRET;

export const withAuthSSP = (getServerSideProps?: GetServerSideProps) => async (
  ctx: GetServerSidePropsContext
) => {
  const { res, req } = ctx;
  const { cookies } = req;

  const { auth, user_id: userId, refresh_token: refreshToken } = cookies;
  if (!userId || !refreshToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }
  let user = {
    id: '',
    email: '',
    password: '',
    refreshTokens: { expiry: '', hash: '' },
  };
  if (userId) {
    const data = await db.collection('users').where('id', '==', userId).get();
    data.forEach((doc) => {
      user = { ...user, ...doc.data(), id: doc.id };
    });
  }

  const isMatch = await compare(refreshToken, user.refreshTokens.hash);
  if (!isMatch) {
    res.setHeader('Set-Cookie', [
      setCookie({ name: 'auth', value: '', options: { maxAge: 0 } }),
      setCookie({ name: 'user_id', value: '', options: { maxAge: 0 } }),
      setCookie({ name: 'refresh_token', value: '', options: { maxAge: 0 } }),
    ]);
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }
  if (userId === user.id && isMatch) {
    if (!auth) {
      const newToken = sign(user, secret, { expiresIn: '1m' });
      const newRefreshToken = uuidv4();
      const newRefreshTokenHash = await hash(newRefreshToken, SALT);
      res.setHeader('Set-Cookie', [
        setCookie({ name: 'auth', value: newToken }),
        setCookie({ name: 'user_id', value: user.id }),
        setCookie({ name: 'refresh_token', value: newRefreshToken }),
      ]);

      await db
        .collection('users')
        .doc(user.id)
        .set({
          ...user,
          refreshTokens: {
            ...user.refreshTokens,
            hash: newRefreshTokenHash,
          },
        });
    }
    return {
      props: {},
    };
  }
  return {
    redirect: {
      destination: '/login',
      permanent: true,
    },
  };
};
