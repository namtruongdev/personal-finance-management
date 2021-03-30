/* eslint-disable import/no-anonymous-default-export */
// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt';

const secret = process.env.NEXT_PUBLIC_SECRET;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: any, res: any) => {
  const token = await jwt.getToken({ req, secret });
  res.send(JSON.stringify(token, null, 2));
};
