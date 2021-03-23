import React from 'react';

import MainLayout from '@layouts/main';
import Link from 'next/link';

const Home = () => (
  <MainLayout>
    <h1>Bảng điều khiển</h1>
    <Link href="/signin">
      <a>signin</a>
    </Link>
  </MainLayout>
);

export default Home;
