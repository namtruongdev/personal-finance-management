import React from 'react';
import {
  SignOutProfile,
  SpanImg,
  DivUser,
  StrongName,
} from '@components/forms/register/styles';
import { setCookie } from '@utils/auth/setCookie';
import {
  // SALT,
  // JWT_TOKEN_EXPIRY,
  // REFRESH_TOKEN_EXPIRY,
  SET_COOKIE_OPTIONS,
} from '@constants/index';

const HeaderProfile = ({ users }) => {
  const { username, picture } = users;
  // console.log(users, "data -----------");

  const handleLogout = () => {
    setCookie({
      name: 'user_id',
      value: '',
      options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
    });
    setCookie({
      name: 'refresh_token',
      value: '',
      options: SET_COOKIE_OPTIONS({ maxAge: 0 }),
    });
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  };
  return (
    <DivUser>
      <SpanImg src={picture || ''} />
      <StrongName>{username}</StrongName>
      <SignOutProfile href="/">
        <StrongName onClick={handleLogout}>log out</StrongName>
      </SignOutProfile>
    </DivUser>
  );
};

export default HeaderProfile;
