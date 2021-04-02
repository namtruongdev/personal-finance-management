import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import {
  ButtonIcon,
  IconAnt,
  NameIcon,
  SpanImg,
} from '@components/forms/register/styles';
import MainLayout from '@layouts/main';
import { signOut, useSession, signIn } from 'next-auth/client';
import Link from 'next/link';
import {
  absoluteUrl,
  getAppCookies,
  setLogout,
  verifyToken,
} from 'constants/until';

const Home = ({ profile, data }) => {
  const [session] = useSession();
  console.log(session, 'hihi');

  const router = useRouter();
  useEffect(() => {
    // if (!session) router.replace('/signin');
  }, [session]);

  return (
    <MainLayout>
      <h1>Bảng điều khiển</h1>
      <button type="button" onClick={() => signIn()}>
        Dang nhap
      </button>
    </MainLayout>
  );
};

// export const getServerSideProps = async (context) => {
//   const { req } = context;
//   const { origin } = absoluteUrl(req);

//   const baseApiUrl = `${origin}/api`;

//   const { token } = getAppCookies(req);
//   const profile = token ? verifyToken(token.split(' ')[1]) : '';

//   return {
//     props: {
//       baseApiUrl,
//       profile,
//     },
//   };
// };
export default Home;
