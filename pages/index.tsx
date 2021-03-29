import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { ButtonIcon, SpanImg } from '@components/forms/register/styles';
import MainLayout from '@layouts/main';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = firebase?.firestore();
  //     const data1 = await data.collection("messages").get();
  //     setInfo(data1.docs.map(doc => doc.data()))
  //   }
  //   fetchData()
  // }, [])
  // const handleLogout = () => {
  //   firebaseDb
  //     .auth()
  //     .signOut()
  //     .then((res) => {
  //       // eslint-disable-next-line no-console
  //       console.log(res, 'log out');
  //     });
  // };
  // const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  // const decoded = jwt.verify(token, 'shhhhh');
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
// function then(arg0: (res: any) => void) {
//     throw new Error('Function not implemented.');
// }
