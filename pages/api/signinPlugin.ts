// import type { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'next-auth/jwt';


// const SigninPlugin = () => async (
//   req: NextApiRequest, res: NextApiResponse
// ) => {
//   console.log('hi')
//   if (req.method === "GET") {
//     res.end('hihi')
//   }
//   if (req.method === 'POST') {
//     try {
//       const secret = process.env.JWT_SECRET;
//       const token = await jwt.getToken({ req, secret })
//       console.log(token, 'token')
//     } catch (err) {
//       res.status(err).json({});
//     }
//   } else {
//     res.status(405);
//   }
//   // const { cookies } = req;
//   // //
//   // const { user_id: userId, refresh_token: refreshToken } = cookies;
//   // // const { auth, refresh_token: refreshToken, user_id: userId } = body;
//   // // const { }
//   // if (req.method === 'POST') {
//   //   console.log('object')
//   //   // res.setHeader('Set-Cookie', [
//   //   //   setCookie({
//   //   //     name: 'auth',
//   //   //     value: 'newToken',
//   //   //     options: SET_COOKIE_OPTIONS({ maxAge: JWT_TOKEN_EXPIRY }),
//   //   //   }),
//   //   //   setCookie({
//   //   //     name: 'user_id',
//   //   //     value: 'userId',
//   //   //     options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
//   //   //   }),
//   //   //   setCookie({
//   //   //     name: 'refresh_token',
//   //   //     value: 'newRefreshToken',
//   //   //     options: SET_COOKIE_OPTIONS({ maxAge: REFRESH_TOKEN_EXPIRY }),
//   //   //   }),
//   //   // ]);
//   //   //   return {
//   //   //     props: {

//   //   //     }
//   //   //   };
//   //   // }
//   //   // const doc = await db.collection('users').doc(userId).get();
//   //   // const user = doc.data();
//   //   // const claims = {
//   //   //   id: userId,
//   //   //   userName: user.username,
//   //   // };
//   // }
//   // return res.status(200).json({
//   //   message: 'Đăng nhập thành công!',
//   //   status: 'OK',
//   // });
// };
// export default SigninPlugin;