import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signup(email: string, name: string, password: string, admin?: boolean) {
    try {
      const users = await this.usersService.findByEmail(email);

      if (users.length) {
        throw new BadRequestException('Email in use');
      }

      //hash password
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');

      //create a new user and save it
      const user = await this.usersService.createUser(
        email,
        name,
        result,
        admin,
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  async signin(email: string, password: string) {
    try {
      const [user] = await this.usersService.findByEmail(email);

      if (!user) {
        throw new NotFoundException('Email not registered');
      }

      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(password, salt, 32)) as Buffer;

      if (storedHash !== hash.toString('hex')) {
        throw new BadRequestException('Incorrect password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
