import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  createUser(
    email: string,
    name: string,
    password: string,
  ): Observable<UserDto> {
    const user = this.repo.create({ name, email, password });

    return from(this.repo.save(user));
  }

  findAll(): Observable<UserDto[]> {
    return from(this.repo.find());
  }
}
