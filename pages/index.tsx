import React from 'react';

import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth/index';
import { Logout } from 'interface/logout';

const Home = ({ user }: Logout) => (
  <MainLayout user={user}>
    <h1>Bảng điều khiển</h1>
  </MainLayout>
);

export const getServerSideProps = withAuthSSP();

export default Home;
