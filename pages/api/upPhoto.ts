import { NextApiRequest, NextApiResponse } from 'next';

import db from '@utils/database';

const UpPhoto = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method === 'GET') {
    return res.status(200).end(`Not support GET request!`);
  }

  await db.collection('users').doc(body.id).update({
    picture: body.photo,
  });

  return res.status(200).json({ message: 'Đăng ký thành công!' });
};

export default UpPhoto;
