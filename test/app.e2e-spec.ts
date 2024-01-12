import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('GameController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/game/start (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/game/start')
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('/game/play/:providedNumber (GET)', async () => {
    const providedNumber = 10; // Replace with a valid test number
    const response = await request(app.getHttpServer())
      .get(`/game/play/${providedNumber}`)
      .expect(200);

    expect(response.body).toBeDefined();
  });

  it('/game/gameover (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/game/gameover')
      .expect(200);

    expect(response.body).toBeDefined();
  });
});
