import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUserService = {
      createUser: (email, name, password) =>
        Promise.resolve({
          id: 1,
          email,
          name,
          password,
          wallet: null,
          shelters: [],
        }),
      findByEmail: (email) => Promise.resolve([]),
    };

    fakeAuthService = {
      signin: (email, password) =>
        Promise.resolve({
          id: 1,
          name: 'Tina',
          email,
          password,
          wallet: null,
          shelters: [],
        }),
      signup: (email, password) =>
        Promise.resolve({
          id: 1,
          name: 'Tina',
          email,
          password,
          wallet: null,
          shelters: [],
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: UserService, useValue: fakeUserService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signin updates session and returns user', async () => {
    const session = { userId: 0 };
    const user = await controller.signin(
      { email: 'abc@abc.com', password: 'password' },
      session,
    );

    expect(user.id).toBe(1);
    expect(session.userId).toBe(1);
  });

  it('SIGNUP updates session and returns user', async () => {
    const session = { userId: 0 };
    const user = await controller.signup(
      { email: 'abc@abc.com', name: 'Tina', password: 'password' },
      session,
    );
  });
});
