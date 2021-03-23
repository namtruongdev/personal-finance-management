import { getSession } from 'next-auth/client';

// eslint-disable-next-line import/no-anonymous-default-export
export default // eslint-disable-next-line @typescript-eslint/no-explicit-any
async (req: any, res: { send: (arg0: string) => void }) => {
  const session = await getSession({ req });
  res.send(JSON.stringify(session, null, 2));
};
