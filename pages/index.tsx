import React from 'react';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import {
  ButtonIcon,
  IconAnt,
  NameIcon,
  SpanImg,
} from '@components/forms/register/styles';
import MainLayout from '@layouts/main';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import {
  absoluteUrl,
  getAppCookies,
  setLogout,
  verifyToken,
} from 'constants/until';
import firestore from '@utils/database/index';

const Home = ({ profile, data }) => {
  const [session] = useSession();
  const handleOnClickLogout = (e) => {
    setLogout(e);
  };

  return (
    <MainLayout>
      <h1>Bảng điều khiển</h1>
      {session || profile ? (
        <a
          href="/api/auth/signout"
          onClick={(e) => {
            e.preventDefault();
            session ? signOut() : handleOnClickLogout(e);
          }}
        >
          {session && session.user.image && (
            <SpanImg
              style={{ backgroundImage: `url(${session.user.image})` }}
            />
          )}
          <span>
            <small>Signed in as</small>
            <br />
            <strong>{session && session.user.name}</strong>
            <strong>{profile && profile.name}</strong>
            <br />
          </span>
          Sign out
        </a>
      ) : (
        <>
          <Link href="/signin">
            <a>
              <ButtonIcon htmlType="button">
                <IconAnt>
                  <LoginOutlined />
                </IconAnt>
                <NameIcon>Sign in</NameIcon>
              </ButtonIcon>
            </a>
          </Link>
          <Link href="/signup">
            <a aria-hidden="true">
              <ButtonIcon>
                <IconAnt right>
                  <UserOutlined />
                </IconAnt>
                <NameIcon>Sign up</NameIcon>
              </ButtonIcon>
            </a>
          </Link>
        </>
      )}
      <div>
        <iframe title="jwt" src="/api/examples/jwt" />
        <iframe title="session" src="/api/examples/session" />
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';
  const entries = await firestore
    .collection('users')
    .doc('mJwTJBGmBU7Eny2IcsrJ')
    .get();
  const data = entries.data();

  return {
    props: {
      baseApiUrl,
      profile,
      data,
    },
  };
};
export default Home;
