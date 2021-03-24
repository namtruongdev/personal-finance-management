import React from 'react';
import styled from 'styled-components';
import MainLayout from '@layouts/main';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { ButtonIcon } from './signup';

const ButtonAuth = styled(ButtonIcon)`
  display: flex !important;
  padding-right: 5px !important;
  /* &:after {
    content: " Sign out";
  } */
`;

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
          <ButtonAuth>
            <LogoutOutlined style={{ fontSize: 22, marginRight: '10px' }} />
          </ButtonAuth>
          Sign out
        </a>
      ) : (
        <>
          <div>
            <Link href="/signin">
              <a>
                <ButtonAuth>
                  <LoginOutlined
                    style={{ fontSize: 22, marginRight: '10px' }}
                  />
                </ButtonAuth>
                signin
              </a>
            </Link>
          </div>
          <p>
            <Link href="/signup">
              <a>signup</a>
            </Link>
          </p>
        </>
      )}
    </MainLayout>
  );
};

export default Home;
