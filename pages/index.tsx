import React from 'react';
import MainLayout from '@layouts/main';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
// import firebaseDb from './firebase';
import 'firebase/auth';

const Home = () => {
  const [session] = useSession();
  // const handleLogout = () => {
  //   firebaseDb
  //     .auth()
  //     .signOut()
  //     .then((res) => {
  //       // eslint-disable-next-line no-console
  //       console.log(res, 'log out');
  //     });
  // };
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
// function then(arg0: (res: any) => void) {
//     throw new Error('Function not implemented.');
// }
