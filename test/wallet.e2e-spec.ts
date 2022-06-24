import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Wallet (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('/wallet/new (GET)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({ email: 'emmaa@email.ue', name: 'Martha', password: '1234a5' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .get('/wallet/new')
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { id, coins, userId } = res.body;

        expect(coins).toBe(0);
        expect(id).toBeDefined();
        expect(userId).toBe(res.body.id);
      });
  });

  it('/wallet (GET)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({ email: 'emmaa@email.ue', name: 'Martha', password: '1234a5' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .get('/wallet/new')
      .set('Cookie', cookie)
      .expect(200);

    await request(app.getHttpServer())
      .get('/wallet')
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { id, coins, userId } = res.body;

        expect(coins).toBe(0);
        expect(id).toBeDefined();
        expect(userId).toBe(res.body.id);
      });
  });

  it('/wallet/charge (PATCH)', async () => {
    const userRes = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'emmaa@email.ue',
        name: 'Martha',
        password: '1234a5',
        admin: true,
      })
      .expect(201);

    const cookie = userRes.get('Set-Cookie');

    const walletRes = await request(app.getHttpServer())
      .get('/wallet/new')
      .set('Cookie', cookie)
      .expect(200);

    await request(app.getHttpServer())
      .patch('/wallet/charge')
      .send({
        coins: 200,
        id: walletRes.body.id,
      })
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { coins } = res.body;

        expect(coins).toBe(200);
      });
  });

  it('/wallet/donate (PATCH)', async () => {
    const userRes = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'emmaa@email.ue',
        name: 'Martha',
        password: '1234a5',
        admin: true,
      })
      .expect(201);
    const cookie = userRes.get('Set-Cookie');

    const walletRes = await request(app.getHttpServer())
      .get('/wallet/new')
      .set('Cookie', cookie)
      .expect(200);

    await request(app.getHttpServer())
      .patch('/wallet/charge')
      .send({
        coins: 200,
        id: walletRes.body.id,
      })
      .set('Cookie', cookie)
      .expect(200);

    const shelterRes = await request(app.getHttpServer())
      .post('/shelter/new')
      .set('Cookie', cookie)
      .send({ name: 'test shelter' })
      .expect(201);

    await request(app.getHttpServer())
      .patch('/wallet/donate')
      .send({
        coins: 150,
        id: walletRes.body.id,
        shelterId: shelterRes.body.id,
      })
      .set('Cookie', cookie)
      .expect(200)
      .then((res) => {
        const { coins } = res.body;

        expect(coins).toBe(50);
      });
  });
});
