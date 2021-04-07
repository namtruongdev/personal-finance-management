/* eslint-disable no-param-reassign */
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { sign, verify } from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

const options = {
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
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    verificationOptions: {
      algorithms: ['HS256'],
    },

    async encode({ secret, token }) {
      const claims = {
        sub: await token?.sub?.toString(),
        name: await token?.name,
        picture: await token?.picture,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60,
      };

      const accessToken = sign(claims, secret);
      return accessToken;
    },
    async decode({ secret, token }) {
      const decodedToken = verify(token, secret) as JWT;
      const decoded = {
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture,
      };
      return decoded;
    },
  },


};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
