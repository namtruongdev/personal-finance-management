/* eslint-disable import/no-anonymous-default-export */
// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt';
// import firebase from 'firebase';
// import { useState } from 'react'

const secret = process.env.NEXT_PUBLIC_SECRET;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: any, res: any) => {
  // const [spellss, setSpellss] = useState([]);
  // let spells = []
  // const fetchData = async () => {
  // const db = firebase.firestore();
  // const data = await db.collection('profile').get();
  // const fakeData = await data.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  // }))
  // const result = await fakeData.filter(word => word.sub === token.sub);
  // spells = await result
  // await setSpells(
  //     data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //     }))
  // );
  // };
  // await fetchData()

  // await hanldlesum(token)

  const token = await jwt.getToken({ req, secret });
  // const result = spells.filter(word => word === token.sub);
  // console.log(result, "log-------------");
  return res.send(JSON.stringify(token, null, 2));
};

// const hanldlesum = async data => {
//     const db = await firebase.firestore();
//     await db.collection('profile').add({ ...data });

// }
