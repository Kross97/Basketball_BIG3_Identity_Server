import { Auth } from '../auth/models/auth';
import * as crypto from 'crypto';

const secretKey = 'Kross_97';

export const buildJWTToken = (body: Auth) => {
  const headerBase64 = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'jwt' }),
  ).toString('base64');
  const bodyBase64 = Buffer.from(JSON.stringify(body)).toString('base64');
  const signature = crypto
    .createHmac('SHA256', secretKey)
    .update(`${headerBase64}.${bodyBase64}`)
    .digest('base64');
  return `${headerBase64}.${bodyBase64}.${signature}`;
};
