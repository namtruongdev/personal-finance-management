import React from 'react';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth/index';

const Home = ({ user, dataUser }) => (
  <MainLayout user={user} >
    <div>
      <h1>Bảng điều khiển</h1>
    </div>
  </MainLayout>
);

export const getServerSideProps = withAuthSSP();

export default Home;
