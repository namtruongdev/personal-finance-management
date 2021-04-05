import { setCookie } from '@utils/auth';
import db from '@utils/database/index';
import bcrypt, { hash }  from 'bcrypt';
import { sign } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { SALT, REFRESH_TOKEN_EXPIRY } from '@constants/index';

const secret = process.env.JWT_SECRET;

const Signin = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  if (method === 'GET') {
    return res.end('Not support GET method!');
  }

  const { username, password } = body;
  let user={ id:'',email:'',password:'' };
  const refreshToken = uuidv4();
  const refreshTokenExpiry = new Date(
    Date.now() + REFRESH_TOKEN_EXPIRY * 1000
  ).toJSON();

  const genHash = await hash(password, SALT);
  const refreshTokenHash = await hash(refreshToken, SALT);

  
    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        error: 'Request missing username or password',
      });
    }
  await  db.collection("users").where("username", "==", username)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          user={ ...user, ...doc.data(), id:doc.id }
      });
  })
  .catch((error) => {
 
  });




  /* Check user email in database */
  

  if (user.id!=='') {
  // //   /* Send error with message */
   

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    // //   /* Sign token */
    const token =  await sign(user, secret, { expiresIn: '1m' });


    res.setHeader(
      'Set-Cookie',
     setCookie({ name:'user-id', value:user.id })
      
    );
    res.setHeader(
      'Set-Cookie',
      [`auth=${token}`, `user-id=${user.id}`]
      
    );
    
    // res.setHeader(
    //   'Set-Cookie',
    //   cookie.serialize('auth', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     sameSite: 'strict',
    //     maxAge: 60,
    //     path: '/',
    //   })
    // );
 
    return res.status(200).json({
      status: 'success',
      token,
    });
  }
  
    return res.status(400).json({ status: 'error', message: 'Sai mật khẩu!' });

  
  }
  
    return  res.status(400).json({ status: 'error', message: 'Tài khoản không tồn tại!' });
  
}


export default Signin;
