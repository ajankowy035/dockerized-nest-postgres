import { UserEntity } from './models/user.entity';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UserService>;

  beforeEach(async () => {
    //fake copy of UserService
    fakeUsersService = {
      findAll: () => Promise.resolve([]),
      createUser: (email: string, name: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          name,
          password,
          shelters: [],
          wallet: null,
          admin: false,
        }),
      findByEmail: () => Promise.resolve([]),
    };

    //temprorary DI test container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.findAll = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'abc@def.com',
          name: 'testName',
          password: '12345',
          shelters: [],
          wallet: null,
          admin: false,
        },
      ]);
    try {
      await service.signup('abc@def.com', 'testName', '12345');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('throws an error if user signs in with incorrect password', async () => {
    fakeUsersService.findAll = () =>
      Promise.resolve([
        {
          id: 1,
          email: 'abc@def.com',
          name: 'testName',
          password: '12345',
          shelters: [],
          wallet: null,
          admin: false,
        },
        ,
      ]);
    try {
      await service.signin('abc@def.com', 'password');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('throws an error if user signups with not registered email', async () => {
    try {
      await service.signin('abc@def.com', '12345');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
