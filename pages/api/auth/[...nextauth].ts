import db from '@utils/database/index';
// import { hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';
// import { v4 as uuidv4 } from 'uuid';

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
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
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
  callbacks: {
    async signIn(props: {
      id: string;
      name: string;
      email: string;
      image: string;
    }) {
      const { id, name, email, image } = props;
      const docs = await db.collection('users').doc(id).get();
      // const secret = process.env.JWT_SECRET;
      if (docs.exists) {
        // const claims = {
        //   id,
        //   name,
        // };
        // const refreshToken = uuidv4();
        // const refreshTokenHash = await hash(refreshToken, SALT);
        // const token = sign(claims, secret, { expiresIn: '15m' });
        return true;
      }
      // cookies.set('name', 'hi')
      // const usersRef = db.collection('users');
      const payload: User = {
        email,
        name,
        username: id,
        image,
        createdAt: new Date().toJSON(),
        password: '',
      };
      await db.collection('users').doc(id).set(payload);
      return true;
    },
  },

  debug: true,
};
const Auth = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
