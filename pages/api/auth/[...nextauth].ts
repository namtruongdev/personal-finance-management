import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import type { NextApiRequest, NextApiResponse } from 'next';

const options = {
  site: process.env.NEXTAUTH_URL,
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
    maxAge: 1 * 60,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },

  callbacks: {
    async signIn(user) {
      console.log(user, 'hhih');

      return true;
    },
    async jwt(props) {
      console.log(props, 'hoho');

      return props;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
