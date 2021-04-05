import React from 'react';

import MainLayout from '@layouts/main';
import { signIn } from 'next-auth/client';
import { withAuthSSP } from '@utils/auth/index';

const Home = () => (
  <MainLayout>
    <h1>Bảng điều khiển</h1>
    <button type="button" onClick={() => signIn()}>
      Dang nhap
    </button>
  </MainLayout>
);

export const getServerSideProps = withAuthSSP();

export default Home;
