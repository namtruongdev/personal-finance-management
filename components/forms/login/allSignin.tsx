import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import firebaseDb from '../../../pages/firebase';
import { ButtonIcon } from '../register/styles';

const ButtonIc = styled(ButtonIcon)`
  margin-right: 5px;
`;
export const SigninGg = () => {
  const router = useRouter();
  const auth = firebaseDb?.auth();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    firebaseDb
      .auth()
      .signInWithPopup(provider)
      .then(() => router.push('/'));
  };
  return (
    <>
      <ButtonIc onClick={signInWithGoogle}>
        <GoogleOutlined style={{ fontSize: '22px' }} />
      </ButtonIc>
    </>
  );
};
export const SigninFb = () => {
  const auth = firebaseDb?.auth();
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    firebaseDb.auth().signInWithPopup(provider);
  };
  return (
    <>
      <ButtonIcon margin onClick={signInWithGoogle}>
        <FacebookFilled style={{ fontSize: 22, marginRight: '10px' }} />
      </ButtonIcon>
    </>
  );
};
