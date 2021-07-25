import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from '../models/auth';
import { buildJWTToken } from '../../helpers/buildJWTToken';

// constructor(@InjectModel(Auth) private authModel) {} - второй способ получить модель для действий

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel) {}

  async signUp(signUpData): Promise<Auth> {
    const token = buildJWTToken(signUpData);
    return Auth.create({ ...signUpData, access_token: token });
  }

  async singIn(signIn): Promise<Auth> {
    const user = await Auth.findOne({ where: { login: signIn.login } });
    if (user && user.password === signIn.password) {
      return user;
    } else {
      throw { invalidSingIn: true };
    }
  }

  async getAllAuth(): Promise<Auth[]> {
    return await Auth.findAll();
  }
}
