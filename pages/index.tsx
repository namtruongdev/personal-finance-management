import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import {
  ButtonIcon,
  FormA,
  FormDiv,
  IconAnt,
  NameIcon,
  SpanImg,
} from '@components/forms/register/styles';
import MainLayout from '@layouts/main';
import {
  absoluteUrl,
  getAppCookies,
  setLogout,
  verifyToken,
} from 'constants/until';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const Home = ({ profile }) => {
  const [session] = useSession();
  const handleOnClickLogout = (e) => {
    setLogout(e);
  };
  return (
    <>
      {session || profile ? (
        <MainLayout>
          <h1>Bảng điều khiển</h1>
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
          <div>
            <iframe title="jwt" src="/api/examples/jwt" />
            <iframe title="session" src="/api/examples/session" />
          </div>
        </MainLayout>
      ) : (
        <FormDiv>
          <Link href="/signin">
            <FormA>
              <ButtonIcon with="with" htmlType="button">
                <IconAnt>
                  <LoginOutlined />
                </IconAnt>
                <NameIcon>Sign in</NameIcon>
              </ButtonIcon>
            </FormA>
          </Link>
          <Link href="/signup">
            <FormA aria-hidden="true">
              <ButtonIcon with="with">
                <IconAnt right>
                  <UserOutlined />
                </IconAnt>
                <NameIcon>Sign up</NameIcon>
              </ButtonIcon>
            </FormA>
          </Link>
        </FormDiv>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';

  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
};
export default Home;
