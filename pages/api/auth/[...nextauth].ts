import type { NextApiRequest, NextApiResponse } from 'next';
import Providers from 'next-auth/providers';

import { sign, verify } from 'jsonwebtoken';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

const options: NextAuthOptions = {
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 900,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    async encode({ secret, token }) {
      const claims = {
        sub: token.sub.toString(),
        name: token.name,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      };

      const accessToken = sign(claims, secret, {
        algorithm: 'RS256',
      });
      return accessToken;
    },
    async decode({ secret, token }) {
      const decodedToken = verify(token, secret, {
        algorithms: ['RS256'],
      }) as JWT;

      const decoded = {
        sub: decodedToken.sub,
        name: decodedToken.name,
      };

      return decoded;
    },
  },
};

const Auth = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
