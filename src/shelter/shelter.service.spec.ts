import { ShelterEntity } from './models/shelter.entity';
import { UserEntity } from './../user/models/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { ShelterService } from './shelter.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('ShelterService', () => {
  let service: ShelterService;
  let fakeUsersService: Partial<UserService>;

  beforeEach(async () => {
    fakeUsersService = {
      findAll: () => Promise.resolve([]),
      donate: () =>
        Promise.resolve(
          Promise.resolve({
            id: 1,
            email: 'email@mail.com',
            name: 'testName',
            password: '123',
          } as UserEntity),
        ),
      findOne: () =>
        Promise.resolve({
          id: 1,
          email: 'email@mail.com',
          name: 'testName',
          password: '123',
        } as UserEntity),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShelterService,
        { provide: UserService, useValue: fakeUsersService },
        {
          provide: getRepositoryToken(ShelterEntity),
          useClass: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ShelterService>(ShelterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
