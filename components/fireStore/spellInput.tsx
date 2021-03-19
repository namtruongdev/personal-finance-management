import React, { useState } from 'react';
import firebase from 'firebase';

const SpellInput = ({ spell, fetchDataInput }) => {
  const [text, setText] = useState(spell.text);
  const [showStatus, setShowStatus] = useState(false);
  const handleUpdate = async () => {
    const db = await firebase.firestore();
    await db
      .collection('messages')
      .doc(spell.id)
      .set({ ...spell, text });
    await fetchDataInput();
  };
  const handleDelete = async () => {
    const db = await firebase.firestore();
    await db.collection('messages').doc(spell.id).delete();
    await fetchDataInput();
  };
  return (
    <>
      {showStatus ? (
        <div>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button type="button" onClick={handleUpdate}>
            {' '}
            update
          </button>
          <button type="button" onClick={handleDelete}>
            {' '}
            Delete
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => setShowStatus(!showStatus)}>
          Edit
        </button>
      )}
    </>
  );
};
export default SpellInput;
