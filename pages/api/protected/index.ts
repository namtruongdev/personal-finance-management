import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

const Protected = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    res.json({
      content: 'Welcome to secret page',
    });
  }
  return res.json({
    error: 'You need to be signed in.',
  });
};

export default Protected;
