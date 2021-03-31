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
import React from 'react';

const Home = ({ profile }) => {
  const [session] = useSession();
  const handleOnClickLogout = (e) => {
    setLogout(e);
  };
  return (
    <>
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
            </span>
            Sign out
          </a>
        ) : (
          <>
            <Link href="/signin">
              <ButtonIcon>
                <IconAnt>
                  <LoginOutlined />
                </IconAnt>
                <NameIcon>Sign in</NameIcon>
              </ButtonIcon>
            </Link>
            <p>
              <Link href="/signup">
                <a>
                  <ButtonIcon>
                    <IconAnt right>
                      <UserOutlined />
                    </IconAnt>
                    <NameIcon>Sign up</NameIcon>
                  </ButtonIcon>
                </a>
              </Link>
            </p>
          </>
        )}
        <div>hi</div>
        <div>
          <iframe title="jwt" src="/api/examples/jwt" />
          <iframe title="session" src="/api/examples/session" />
        </div>
      </MainLayout>
    </>
  );
};

export async function getServerSideProps(context) {
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
}
export default Home;
// function then(arg0: (res: any) => void) {
//     throw new Error('Function not implemented.');
// }
