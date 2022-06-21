import { ShelterService } from './shelter.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ShelterController } from './shelter.controller';

describe('ShelterController', () => {
  let controller: ShelterController;
  let fakeshelterService: Partial<ShelterService>;

  beforeEach(async () => {
    fakeshelterService = {
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
      controllers: [ShelterController],
      providers: [{ provide: ShelterService, useValue: fakeshelterService }],
    }).compile();

    controller = module.get<ShelterController>(ShelterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAll returns a list of shelters', async () => {
    const shelters = await controller.getAll();

    expect(shelters.length).toBe(1);
    expect(shelters[0].name).toBe('Test Shelter');
  });

  it('getOne returns one shelter record', async () => {
    const shelter = await controller.getOne('1');

    expect(shelter.name).toBe('Test Shelter');
  });

  it('getOne throws an error when record is not found', async () => {
    try {
      await controller.getOne('666');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
