import React from 'react';

import MainLayout from '@layouts/main';
import { signIn } from 'next-auth/client';

const Home = () => (
  <MainLayout>
    <h1>Bảng điều khiển</h1>
    <button type="button" onClick={() => signIn()}>
      Dang nhap
    </button>
  </MainLayout>
);

export default Home;
