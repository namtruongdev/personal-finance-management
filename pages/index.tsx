import React from 'react';

import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth/index';

const Home = () => (
  <MainLayout>
    <h1>Bảng điều khiển</h1>
  </MainLayout>
);

export const getServerSideProps = withAuthSSP();

export default Home;
