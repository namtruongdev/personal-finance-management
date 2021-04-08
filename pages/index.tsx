import React from 'react';

import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth/index';
import { useRouter } from 'next/router';

const Home = ({ user }) => {
  const router = useRouter();
  return (
    <MainLayout>
      <h1>Bảng điều khiển</h1>
      {(user && user.username) || user.name}
      <button
        type="button"
        onClick={() => {
          router.push('/logout');
        }}
      >
        Logout
      </button>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthSSP();

export default Home;
