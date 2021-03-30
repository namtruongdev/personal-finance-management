import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import SpellInput from '@components/fireStore/spellInput';
// import firebaseDb from './firebase';

const StoreFireBase = () => {
  const [spells, setSpells] = useState([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = firebase.firestore();
    const data = await db.collection('messages').get();
    await setSpells(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };
  const handleAdd = async () => {
    const db = firebase.firestore();
    await db.collection('messages').add({ text: newText });
    await fetchData();
  };
  return (
    <div>
      <input value={newText} onChange={(e) => setNewText(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Create
      </button>
      <ul>
        {spells.map((spell) => (
          <li key={spell.uid}>
            {spell.text}

            <SpellInput spell={spell} fetchDataInput={fetchData} />

            <img src={spell.photoURL} alt="hieu" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreFireBase;
