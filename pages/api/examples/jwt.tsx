import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await jwt.getToken({ req, secret });
  res.send(JSON.stringify(token, null, 2));
};
