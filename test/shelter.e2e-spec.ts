import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Shelter (e2e)', () => {
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

  it('/shelter/new (POST)', async () => {
    const shelterName = 'testShelter';

    await request(app.getHttpServer())
      .post('/shelter/new')
      .send({ name: shelterName })
      .expect(201)
      .then((res) => {
        const { id, budget, name } = res.body;

        expect(budget).toBe(0);
        expect(name).toBe(shelterName);
        expect(id).toBeDefined();
      });
  });

  it('/shelter (GET)', async () => {
    const shelterName = 'testShelter';

    await request(app.getHttpServer())
      .post('/shelter/new')
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
