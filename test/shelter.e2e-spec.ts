import { CurrentUserMiddleaware } from './../src/user/middlewares/current-user.middleware';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Shelter (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CurrentUserMiddleaware)
      .useValue(CurrentUserMiddleaware)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  it('/shelter/new (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'mail@mail.com',
        name: 'Martha',
        password: '12345',
        admin: true,
      })
      .expect(201);

    const shelterName = 'djskfn';
    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .post('/shelter/new')
      .send({ name: shelterName })
      .set('Cookie', cookie)
      .expect(201)
      .then((res) => {
        const { id, budget, name } = res.body;

        expect(budget).toBe(0);
        expect(name).toBe(shelterName);
        expect(id).toBeDefined();
      });
  });

  it('/shelter/new (POST) when shelter with provided name exists', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'mail@mail.com',
        name: 'Martha',
        password: '12345',
        admin: true,
      })
      .expect(201);

    const shelterName = 'djskfn';
    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .post('/shelter/new')
      .send({ name: shelterName })
      .set('Cookie', cookie)
      .expect(201);

    await request(app.getHttpServer())
      .post('/shelter/new')
      .send({ name: shelterName })
      .set('Cookie', cookie)
      .expect(400);
  });

  it('/shelter (GET)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'mail@mail.com',
        name: 'Martha',
        password: '12345',
        admin: true,
      })
      .expect(201);

    const shelterName = 'testShelter';
    const cookie = res.get('Set-Cookie');

    await request(app.getHttpServer())
      .post('/shelter/new')
      .set('Cookie', cookie)
      .send({ name: shelterName })
      .expect(201);

    await request(app.getHttpServer())
      .get('/shelter')
      .expect(200)
      .then((res) => {
        const { id, budget, name } = res.body[0];

        expect(budget).toBe(0);
        expect(name).toBe(shelterName);
        expect(id).toBeDefined();
      });
  });
});
