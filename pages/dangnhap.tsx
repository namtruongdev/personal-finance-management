import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
// import firebaseDb from './firebase';

const Dangnhap = () => {
  const [spells, setSpells] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('messages').get();

      setSpells(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {spells.map((spell) => (
          <li key={spell.uid}>
            {spell.uid}
            <img src={spell.photoURL} alt="hieu" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dangnhap;
