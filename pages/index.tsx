import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { ButtonIcon } from '@components/forms/register/styles';
import MainLayout from '@layouts/main';
import 'firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import firebaseDb from './firebase';

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
  const [user, setUser] = useState(firebaseDb?.auth().currentUser);
  const handleLogout = () => {
    firebaseDb
      .auth()
      .signOut()
      .then((res) => {
        setUser(firebaseDb?.auth().currentUser);
      });
  };
  return (
    <MainLayout>
      <h1>Bảng điều khiển</h1>

      {user ? (
        <>
          {user.displayName}
          <ButtonInPage onClick={handleLogout}>
            <IconAnt left>
              <LogoutOutlined />
            </IconAnt>
            <NameIcon>Log out</NameIcon>
          </ButtonInPage>
        </>
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
