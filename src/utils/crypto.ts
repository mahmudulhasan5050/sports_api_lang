import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { IUser } from '../models/User';
import { secretAuth } from './secrets';


export const generateToken = (data: string, secretKey: string): string => {
  const encrypted = jwt.sign(data, secretKey)
  return encrypted;
};


export const generateEmailConfirmationToken = (): string => {

  const hash = crypto.randomBytes(32).toString('hex')
  return hash;
};


//---------------------------------------

export const genPassword = (password: string) =>{
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  
  return {
    salt: salt,
    hash: genHash
  };
}

export const validPassword = (password:string, hash:string, salt: string)=> {
  var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === hashVerify;
}

export const issueJWT =(user:IUser)=> {
  const _id = user._id;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    name:user.name,
    role: user.role,
    iat: Date.now()
  };

  const signedToken = jwt.sign(payload, secretAuth, { expiresIn: expiresIn });

  return "Bearer " + signedToken
}