import React from 'react';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';

export default function Estimate({ user }) {
  return (
    <>
      <MainLayout users={user}>
        <h1>Kế hoạch chi tiêu</h1>
      </MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
