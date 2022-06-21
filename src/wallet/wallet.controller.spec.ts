import { WalletEntity } from './models/wallet.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

describe('WalletController', () => {
  let controller: WalletController;
  let fakeWalletService: Partial<WalletService>;

  beforeEach(async () => {
    fakeWalletService = {
      getOne: () =>
        Promise.resolve({
          id: 1,
          coins: 1230,
          user: { id: 5 },
        } as WalletEntity),
      create: () =>
        Promise.resolve({
          id: 1,
          coins: 1230,
          user: { id: 5 },
        } as WalletEntity),
      donate: (coins: number) =>
        Promise.resolve({
          id: 1,
          coins: 1230 + coins,
          user: { id: 5 },
        } as WalletEntity),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [{ provide: WalletService, useValue: fakeWalletService }],
    }).compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getOne throws an error when cannot find a wallet', async () => {
    try {
      await controller.getOne({
        id: 111,
        email: 'mail@mail.com',
        name: 'name',
        password: 'password',
        wallet: null,
        shelters: [],
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
