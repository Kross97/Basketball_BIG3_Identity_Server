import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from '../models/auth';
import { createHmac } from 'crypto';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { encode, decode } from 'js-base64';

const SECRET_KEY = 'cAtwa1kkEy';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel) {}

  async signUp(signUpData): Promise<Auth> {
    const unToken = decode(signUpData);
    console.log('UN_TOKEN =>', unToken);
    return this.authModel.create(signUpData);
  }
}
