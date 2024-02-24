// utils/auth.ts

import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = 'your-secret-key';

interface Payload {
  email: string;
  password:string;

}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, secret, {noTimestamp: true});
};

export const verifyToken = (payload1: string,payload2: string) => {
  const token1 = jwt.verify(payload1, secret) as Payload;
  const token2 = jwt.verify(payload2, secret) as Payload;
  return token1 == token2
};
