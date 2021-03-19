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
        .remove((err) => {});
    }
  };
  const handleGetFireBase = () => {
    firebaseDb
      .database()
      .ref()
      .child('datafirebase')
      .push(data, (err) => {});
  };

  return (
    <div>
      {Object.keys(contactObjects).map((id) => (
        <div key={id}>
          {contactObjects[id].base}

          <button type="button" onClick={() => handleFireBase(id)}>
            delete
          </button>
        </div>
      ))}
      <button type="button" onClick={handleGetFireBase}>
        get data
      </button>
    </div>
  );
};
export default Contacts;
