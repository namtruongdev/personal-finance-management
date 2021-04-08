import React from 'react';
import MainLayout from '@layouts/main';
import { withAuthSSP } from '@utils/auth';

export default function Estimate({ user }) {
  return (
    <>
      <MainLayout users={user}>
        <h1>Thu nhập</h1>
      </MainLayout>
    </>
  );
}
export const getServerSideProps = withAuthSSP();
