import { SET_COOKIE_OPTIONS } from '@constants/jwt';
import { setCookie } from '@utils/auth';
import { GetServerSideProps } from 'next';
import React from 'react';

export default function PageLogout() {
  return (
    <>
      hi
    </>
  );

}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res } = ctx;
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
    setCookie({
      name: 'next-auth.session-token',
      value: '',
      options: SET_COOKIE_OPTIONS({ maxAge: 0 })
    })
  ]);
  return {
    redirect: {
      destination: '/login',
      permanent: true,
    },

  }
}