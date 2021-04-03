import Link from 'next/link';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import MainLayout from '@layouts/main';
import { signOut, useSession, signIn, getSession } from 'next-auth/client';

const Home = () => {
  const [session] = useSession();
  console.log(session, 'hihi');

  const router = useRouter();

  return (
    <MainLayout>
      <h1>Bảng điều khiển</h1>
      <button type="button" onClick={() => signIn()}>
        Dang nhap
      </button>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getSession(ctx);
  console.log(ctx.req.cookies);

  return {
    props: {
      session,
    },
  };
};

export default Home;
