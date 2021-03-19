import { getCsrfToken } from 'next-auth/client';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const csrfToken = await getCsrfToken({ req });
  res.send(JSON.stringify(csrfToken, null, 2));
};
