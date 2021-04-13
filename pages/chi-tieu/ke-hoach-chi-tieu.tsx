import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';
import React from 'react';
// import { useRouter } from 'next/router';

export default function Estimate({ user, dataUser }) {
  // const router = useRouter();
  // const routes: Routes[] = useMemo(
  //   () => [
  //     {
  //       path: '/',
  //       breadcrumbName: 'Trang chủ',
  //     },
  //     {
  //       path: '/du-toan',
  //       breadcrumbName: 'Dự toán',
  //     },
  //     {
  //       path: '/phan-bo-thu-nhap',
  //       breadcrumbName: 'Kế hoạch chi tiêu',
  //     },
  //   ],
  //   []
  // );
  return (
    <>
      <MainLayout user={user}>hi</MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
