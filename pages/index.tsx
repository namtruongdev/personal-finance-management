import React from 'react';

import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth/index';
import { useRouter } from 'next/router';
import { fetchAPI } from '@utils/services';
import { notification } from 'antd';

const Home = ({ user }) => {
  const router = useRouter();
  const Logout = async () => {
    const res = await fetchAPI({
      url: 'http://localhost:3000/api/logout',
      method: 'GET',
    });

    if (res.ok) {
      notification.success({
        message: 'Đăng xuất thành công!',
      });
      return router.replace('/login');
    }

    return notification.error({
      message: 'Đăng xuất thất bại!',
    });
  };
  return (
    <MainLayout>
      <h1>Bảng điều khiển</h1>
      {user && user.username}
      <button type="button" onClick={Logout}>
        Logout
      </button>
    </MainLayout>
  );
};

export const getServerSideProps = withAuthSSP();

export default Home;
