import { NextApiRequest, NextApiResponse } from 'next';
import db from '@utils/database';

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id: userId } = req.cookies;
  const { body } = req;
  const doc = await db.collection('users').doc(userId);
  doc.update({
    dutoan: {
      thunhap: [
        ...body
      ]
    }
  })

  return res.status(200).json({ message: 'Sửa thành công' });;
};
export default Logout;
