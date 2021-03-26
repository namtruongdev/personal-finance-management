import React from 'react';
import MainLayout from '@layouts/main';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
// import firebaseDb from './firebase';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { ButtonIcon } from '@components/forms/register/styles';

const ButtonInPage = styled(ButtonIcon)`
  /* padding-left:4px */
`;
interface Props {
  right?: String | Boolean;
  left?: String | Boolean;
}
export const IconAnt = styled.span<Props>`
  font-size: 1.5rem;
  margin-top: -5px;
  padding-right: 8px;
  margin-left: 54px;
  margin-left: ${(props) => (props.right ? '59px' : '')};
  margin-left: ${(props) => (props.left ? '-12px' : '')};
  margin-top: ${(props) => (props.left ? '-7px' : '')};
`;
export const NameIcon = styled.span`
  font-size: 16px;
`;
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
        <>
          <p>
            <Link href="/signin">
              <a>
                <ButtonInPage>
                  <IconAnt>
                    <LoginOutlined />
                  </IconAnt>
                  <NameIcon>Sign in</NameIcon>
                </ButtonInPage>
              </a>
            </Link>
          </p>
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
    </MainLayout>
  );
};

export default Home;
// function then(arg0: (res: any) => void) {
//     throw new Error('Function not implemented.');
// }
