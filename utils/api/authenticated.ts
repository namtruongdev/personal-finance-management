import { verify } from 'jsonwebtoken';

import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.JWT_SECRET;
export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(req.cookies.auth!, secret, async (err, decoded) => {
    if (!err && decoded) {
      return fn(req, res);
    }
    return res
      .status(401)
      .json({ message: 'Sorry you are not authenticated!' });
  });
};
