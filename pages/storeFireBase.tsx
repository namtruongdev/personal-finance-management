import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import SpellInput from '@components/fireStore/spellInput';

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
      <div>
        <input value={newText} onChange={(e) => setNewText(e.target.value)} />
        <button type="button" onClick={handleAdd}>
          Create
        </button>
      </div>
      <ul>
        {spells.map((spell) => (
          <li key={spell.uid}>
            <img src={spell.photoURL} alt="hieu" />
            {spell.text}

            <SpellInput spell={spell} fetchDataInput={fetchData} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreFireBase;
