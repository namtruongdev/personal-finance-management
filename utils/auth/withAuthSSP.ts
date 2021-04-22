import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import {
  SALT,
  JWT_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  SET_COOKIE_OPTIONS,
} from '@constants/index';
import db from '@utils/database';
import { hash, compare } from 'bcryptjs';
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

  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) {
    res.setHeader('Set-Cookie', [
      setCookie({
        name: 'user_id',
        value: '',
        options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
      }),
      setCookie({
        name: 'refresh_token',
        value: '',
        options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
      }),
    ]);
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const user = doc.data();

  const claims = {
    id: userId,
    userName: user.username,
  };

  const isMatch = await compare(refreshToken, user.refreshTokenHash);
  if (!isMatch) {
    res.setHeader('Set-Cookie', [
      setCookie({
        name: 'auth',
        value: '',
        options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
      }),
      setCookie({
        name: 'user_id',
        value: '',
        options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
      }),
      setCookie({
        name: 'refresh_token',
        value: '',
        options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
      }),
    ]);

    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  if (isMatch) {
    if (!auth) {
      const newToken = sign(claims, secret, { expiresIn: '15m' });
      const newRefreshToken = uuidv4();
      const newRefreshTokenHash = await hash(newRefreshToken, SALT);

      res.setHeader('Set-Cookie', [
        setCookie({
          name: 'auth',
          value: newToken,
          options: SET_COOKIE_OPTIONS({ maxAge: JWT_TOKEN_EXPIRY }),
        }),
        setCookie({
          name: 'user_id',
          value: userId,
          options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
        }),
        setCookie({
          name: 'refresh_token',
          value: newRefreshToken,
          options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
        }),
      ]);
      await db.collection('users').doc(userId).update({
        refreshTokenHash: newRefreshTokenHash,
      });
    }
    return {
      props: {
        user,
      },
    };
  }
  return {
    redirect: {
      destination: '/login',
      permanent: true,
    },
  };
};
