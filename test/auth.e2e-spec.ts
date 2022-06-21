import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentification (e2e)', () => {
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

  it('/users/signup (POST)', async () => {
    const userEmail = 'ab1cs@test.com';

    return request(app.getHttpServer())
      .post('/users/signup')
      .send({ email: userEmail, name: 'Martha', password: '12345' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;

        expect(id).toBeDefined();
        expect(email).toBe(userEmail);
      });
  });

  it('/users/user (GET)', async () => {
    const email = 'axb1c@test.com';
    const name = 'TestName';

    const res = await request(app.getHttpServer())
      .post('/users/signup')
      .send({ email, name, password: '1234w5' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/users/user')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toBe(email);
    expect(body.name).toBe(name);
  });

  it('/users/signin (POST)', async () => {
    const userEmail = 'ab1c@test.com';
    const userPassword = '12345';

    await request(app.getHttpServer())
      .post('/users/signup')
      .send({ email: userEmail, name: 'Martha', password: userPassword });

    await request(app.getHttpServer())
      .post('/users/signin')
      .send({ email: userEmail, password: userPassword })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;

        expect(email).toBe(userEmail);
        expect(id).toBeDefined();
      });
  });
});
