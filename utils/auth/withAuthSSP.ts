import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const withAuthSSP = (getServerSideProps?: GetServerSideProps) => async (
  ctx: GetServerSidePropsContext
) => {
  const token = ctx?.req?.cookies?.auth;
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const user = verify(token, secret, async (err, decoded) => {
    console.log(err, 'loi');

    if (!err && decoded) {
      // console.log(user);
    }
  });

  return {
    props: {
      user: {},
    },
  };
};
