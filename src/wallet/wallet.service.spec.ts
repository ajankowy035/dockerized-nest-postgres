import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ShelterService } from './../shelter/shelter.service';
import { WalletService } from './wallet.service';
import { WalletEntity } from './models/wallet.entity';

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('WalletService', () => {
  let service: WalletService;
  let fakeShelterService: Partial<ShelterService>;

  beforeEach(async () => {
    fakeShelterService = {
      getAll: () =>
        Promise.resolve([
          { id: 1, name: 'Test Shelter', budget: 2100, donators: [] },
        ]),
      createShelter: () =>
        Promise.resolve({
          id: 1,
          name: 'Test Shelter',
          budget: 2100,
          donators: [],
        }),
      findOne: (id) =>
        Promise.resolve({
          id,
          name: 'Test Shelter',
          budget: 2100,
          donators: [],
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: ShelterService, useValue: fakeShelterService },
        { provide: getRepositoryToken(WalletEntity), useClass: mockRepository },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
