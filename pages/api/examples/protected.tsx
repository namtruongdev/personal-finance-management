/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { getSession } from 'next-auth/client';

// eslint-disable-next-line max-len
export default async (
  req: any,
  res: {
    send: (arg0: { content?: string; error?: string }) => void;
  }
) => {
  const session = await getSession({ req });

  if (session) {
    res.send({
      content:
        'This is protected content. You can access this content because you are signed in.',
    });
  } else {
    res.send({
      error: 'You must be sign in to view the protected content on this page.',
    });
  }
};
