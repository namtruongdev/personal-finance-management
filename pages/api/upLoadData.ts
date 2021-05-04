import { NextApiRequest, NextApiResponse } from 'next';
import db from '@utils/database';

const UploadData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id: userId } = req.cookies;
  const { body } = req;
  const doc = db.collection('users').doc(userId);
  const data = (await doc.get()).data();
  const thunhap = data.dutoan.thunhap;
  doc.update({
    dutoan: {
      thunhap: [
        ...thunhap,
        body
      ]
    }
  })
  return res.status(200).json({ message: 'Đăng xuất thành công' });
};
export default UploadData;
