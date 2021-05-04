import { NextApiRequest, NextApiResponse } from 'next';
import db from '@utils/database';
import { yearCrr } from '@constants/year';

const UploadData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id: userId } = req.cookies;
  const { body } = req;
  const doc = db.collection('users').doc(userId);
  const data = (await doc.get()).data();
  const { thunhap } = data[`nam${yearCrr}`].dutoan;
  await doc.update({
    [`nam${yearCrr}`]: {
      dutoan: {
        thunhap: [
          ...thunhap,
          body
        ]
      }
    }
  })
  return res.status(200).json({ message: 'Thêm thành công' });
};
export default UploadData;
