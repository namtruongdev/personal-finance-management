import { NextApiRequest, NextApiResponse } from 'next';
import { getCsrfToken } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const csrfToken = await getCsrfToken({ req });
  res.send(JSON.stringify(csrfToken, null, 2));
};
