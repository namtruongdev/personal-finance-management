import type { NextApiRequest, NextApiResponse } from 'next';
import Providers from 'next-auth/providers';
// import db from '@utils/database/index';
// import { hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
// import { v4 as uuidv4 } from 'uuid';

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

      const accessToken = sign(claims, secret);
      return accessToken;
    },
    async decode({ secret, token }) {
      const decodedToken = verify(token, secret) as JWT;
      const decoded = {
        sub: decodedToken.sub,
        name: decodedToken.name,
      };

      return decoded;
    },
  },

  events: {
    async signIn({ user }) {
      // const secret = process.env.JWT_SECRET;
      // const { id, name, email, image } = user;
      // const docsRef = db.collection('users').doc(`${id}`);
      // const docs = await docsRef.get();
      // if (docs.exists) {
      //   console.log('hhhhhhhhhhhhhhhhhhhhhh');
      // const claims = {
      //   id,
      //   name,
      // };
      // const refreshToken = uuidv4();
      // const refreshTokenHash = await hash(refreshToken, SALT);
      // const token = sign(claims, secret, { expiresIn: '15m' });
    },

    // if (!docs.exists) {
    //   console.log('no exists');

    // }
    // const payload: User = {
    //   email,
    //   name,
    //   username: id,
    //   image,
    //   createdAt: new Date().toJSON(),
    //   password: '',
    // };
    // console.log(payload, 'hihi');

    // await docsRef.set(payload);
    // },
  },
};

const Auth = async (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
