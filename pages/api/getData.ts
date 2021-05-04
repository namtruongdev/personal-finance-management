import { NextApiRequest, NextApiResponse } from 'next';
import db from '@utils/database';
import { yearCrr } from '@constants/year';

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id: userId } = req.cookies;
  const { body } = req;
  // console.log(body, [`nam${yearCrr}`])
  const doc = await db.collection('users').doc(userId).get();
  const data = await doc.data()[body].dutoan;
  return res.status(200).json({ data });
};
export default Logout;
