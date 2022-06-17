import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  add(@Body() body: CreateUserDto): Observable<UserDto> {
    return this.userService.createUser(body.email, body.name, body.password);
  }

  @Get()
  getUsers(): Observable<UserDto[]> {
    return this.userService.findAll();
  }
}
