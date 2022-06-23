import { AdminGuard } from 'src/guards/admin.guard';
import {
  Controller,
  Session,
  Body,
  Get,
  Post,
  Param,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.intraceptor';
import { AuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { SignInUserDto } from './dtos/signin-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/user')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user: UserDto) {
    return user;
  }

  @Get('/')
  @UseGuards(AdminGuard)
  allUsers() {
    return this.userService.findAll();
  }

  @Post('/signup')
  async signup(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<UserDto> {
    const user = await this.authService.signup(
      body.email,
      body.name,
      body.password,
    );
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SignInUserDto, @Session() session: any) {
    try {
      const user = await this.authService.signin(body.email, body.password);
      session.userId = user.id;

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
