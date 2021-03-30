import React, { useState, useEffect } from 'react';
import firebaseDb from './firebase';

const Contacts = () => {
  const [data] = useState({
    base: 'okeoke',
    number: 2,
  });
  const [contactObjects, setContactObjects] = useState({});

  useEffect(() => {
    firebaseDb
      ?.database()
      .ref()
      .child('datafirebase')
      .on('value', (snapshot) => {
        if (snapshot.val() != null) {
          setContactObjects({ ...snapshot.val() });
        } else {
          setContactObjects({});
        }
      });
  }, []);

  const handleFireBase = (key) => {
    if (window.confirm('Are you sure to delete')) {
      firebaseDb
        .database()
        .ref()
        .child(`datafirebase/${key}`)
        .remove((err) => {
          if (err)
            // eslint-disable-next-line no-console
            console.log(err);
          // eslint-disable-next-line no-console
          else console.log(err);
        });
    }
  };
  const handleGetFireBase = () => {
    firebaseDb
      .database()
      .ref()
      .child('datafirebase')
      .push(data, (err) => {
        if (err)
          // eslint-disable-next-line no-console
          console.log(err);
      });
  };
  // eslint-disable-next-line no-console
  console.log(contactObjects, 'test key');

  return (
    <div>
      {
        // eslint-disable-next-line max-len
        // eslint-disable-next-line no-console
        Object.keys(contactObjects).map((id) => (
          // eslint-disable-next-line react/jsx-key

          <div key={id}>
            {contactObjects[id].base}
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={() => handleFireBase(id)}>delete</button>
          </div>
        ))
      }

      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={handleGetFireBase}>get data</button>
    </div>
  );
};
export default Contacts;
