import React from 'react';
import MainLayout from '@layouts/main';
import Contacts from './constans';
import StoreFireBase from './storeFireBase';

const Example = () => (
  <MainLayout>
    <Contacts />
    <StoreFireBase />
    <h1>Example page</h1>
  </MainLayout>
);

export default Example;
