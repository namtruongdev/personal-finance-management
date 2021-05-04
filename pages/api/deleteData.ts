import { NextApiRequest, NextApiResponse } from 'next';
import db from '@utils/database';
import { yearCrr } from '@constants/year';

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id: userId } = req.cookies;
  const { body } = req;
  const doc = await db.collection('users').doc(userId);
  const data = (await doc.get()).data();
  const { thunhap } = data.dutoan
  if (req.method === "POST") {
    await doc.update({
      dutoan: {
        thunhap: [
          ...thunhap.filter((item: DataTableMonth) => item.key !== body)
        ]
      }
    })
    return res.status(200).json({ message: 'Xóa thành công' });;
  }
  doc.update({
    [`nam${yearCrr}`]: {
      dutoan: {
        thunhap: [
          ...body
        ]
      }
    }
  })

  return res.status(200).json({ message: 'Xóa thành công' });;
};
export default Logout;
