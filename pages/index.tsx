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
import React from 'react';
import styled from 'styled-components';

const ButtonInPage = styled(ButtonIcon)`
  /* padding-left:4px */
`;
const Home = () => {
  const [session] = useSession();
  return (
    <>
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
            {session.user.image && (
              <SpanImg
                style={{ backgroundImage: `url(${session.user.image})` }}
              />
            )}
            <span>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.name}</strong>
            </span>
            Sign out
          </a>
        ) : (
          <>
            <Link href="/signin">
              <ButtonInPage>
                <IconAnt>
                  <LoginOutlined />
                </IconAnt>
                <NameIcon>Sign in</NameIcon>
              </ButtonInPage>
            </Link>
            <p>
              <Link href="/signup">
                <a>
                  <ButtonInPage>
                    <IconAnt right>
                      <UserOutlined />
                    </IconAnt>
                    <NameIcon>Sign up</NameIcon>
                  </ButtonInPage>
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

export default Home;
