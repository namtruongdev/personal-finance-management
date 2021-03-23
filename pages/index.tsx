import React from 'react';

import MainLayout from '@layouts/main';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

const Home = () => {
  const [session] = useSession();
  return (
    <MainLayout>
      <h1>Bảng điều khiển</h1>
      {session ? (
        <a
          href="/api/auth/signout"
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </a>
      ) : (
        'chua signin'
      )}
      <p>
        <Link href="/signin">
          <a>signin</a>
        </Link>
      </p>
      <p>
        <Link href="/signup">
          <a>signup</a>
        </Link>
      </p>
    </MainLayout>
  );
};

export default Home;
