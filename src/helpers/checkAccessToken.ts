import { createHmac } from 'crypto';
import { secretKey } from './buildJWTToken';

export const checkAccessToken = (bearerHeaders: string) => {
  const tokenParts = bearerHeaders.split(' ')[1].split('.');
  const signature = createHmac('SHA256', secretKey)
    .update(`${tokenParts[0]}.${tokenParts[1]}`)
    .digest('base64');

  return tokenParts[2] === signature;
};
