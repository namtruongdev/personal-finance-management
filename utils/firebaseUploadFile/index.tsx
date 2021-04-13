import firebase from 'firebase';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDSk4bsrEJZWwRz-YkNBEoLxRArb5IN9Z0',
  authDomain: 'nextjs-8be4d.firebaseapp.com',
  databaseURL: 'https://nextjs-8be4d-default-rtdb.firebaseio.com',
  projectId: 'nextjs-8be4d',
  storageBucket: 'nextjs-8be4d.appspot.com',
  messagingSenderId: '704232791157',
  appId: '1:704232791157:web:365e9f5b6168ec56f92c3c',
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };
