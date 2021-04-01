import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { IconAnt, NameIcon, SpanImg } from '@components/forms/register/styles';
import { setLogout } from 'constants/until';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

export default function PageAuth() {
  const [session] = useSession();
  const handleOnClickLogout = (e) => {
    setLogout(e);
  };
  // console.log(profile)
  return (
    <>
      {session ? (
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
            {/* <strong>{profile && profile.name}</strong> */}
            <br />
          </span>
          Sign out
        </a>
      ) : (
        <>
          <section style={{ display: 'flex' }}>
            <div style={{ marginRight: '10px' }}>
              <Link href="/signin">
                <a>
                  <IconAnt>
                    <LoginOutlined />
                  </IconAnt>
                  <NameIcon>Sign in</NameIcon>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/signup">
                <a aria-hidden="true">
                  <IconAnt right>
                    <UserOutlined />
                  </IconAnt>
                  <NameIcon>Sign up</NameIcon>
                </a>
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}
// export const getServerSideProps = async (context) => {
//   const { req } = context;
//   const { origin } = absoluteUrl(req);

//   const baseApiUrl = `${origin}/api`;

//   const { token } = getAppCookies(req);
//   const profile = token ? verifyToken(token.split(' ')[1]) : '';
//   const entries = await firestore
//     .collection('users')
//     .doc('mJwTJBGmBU7Eny2IcsrJ')
//     .get();
//   const data = entries.data();

//   return {
//     props: {
//       baseApiUrl,
//       profile,
//       data,
//     },
//   };
// };
