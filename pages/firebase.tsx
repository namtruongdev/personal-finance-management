import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDSk4bsrEJZWwRz-YkNBEoLxRArb5IN9Z0',
  authDomain: 'nextjs-8be4d.firebaseapp.com',
  databaseURL: 'https://nextjs-8be4d-default-rtdb.firebaseio.com',
  projectId: 'nextjs-8be4d',
  storageBucket: 'nextjs-8be4d.appspot.com',
  messagingSenderId: '704232791157',
  appId: '1:704232791157:web:365e9f5b6168ec56f92c3c',
};

// eslint-disable-next-line max-len
const fireDb = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : null;

// eslint-disable-next-line max-len
export default fireDb;
