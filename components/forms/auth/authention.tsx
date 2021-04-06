import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { IconAnt, NameIcon, SpanImg } from '@components/forms/register/styles';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

export default function PageAuth() {
  const [session] = useSession();
  const handleOnClickLogout = (e) => {};
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
          <section>
            <Link href="/login">
              <a>
                {/* <ButtonIcon htmlType="button"> */}
                <IconAnt>
                  <LoginOutlined />
                </IconAnt>
                <NameIcon>Sign in</NameIcon>
                {/* </ButtonIcon> */}
              </a>
            </Link>
            <Link href="/signup">
              <a aria-hidden="true">
                {/* <ButtonIcon> */}
                <IconAnt right>
                  <UserOutlined />
                </IconAnt>
                <NameIcon>Sign up</NameIcon>
                {/* </ButtonIcon> */}
              </a>
            </Link>
          </section>
        </>
      )}
    </>
  );
}
