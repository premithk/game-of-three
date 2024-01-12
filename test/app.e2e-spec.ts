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
    const providedNumber = 10;
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

  describe('test the entire game flow using a single node', () => {
    beforeAll(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.055);
    });

    afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('starting with 56 the game should be over in 5 steps', async () => {
      let response = await request(app.getHttpServer())
        .get('/game/start')
        .expect(200);

      expect(response.text).toEqual('56');

      response = await request(app.getHttpServer())
        .get(`/game/play/${response.text}`)
        .expect(200);

      expect(response.text).toEqual('19');

      response = await request(app.getHttpServer())
        .get(`/game/play/${response.text}`)
        .expect(200);

      expect(response.text).toEqual('6');

      response = await request(app.getHttpServer())
        .get(`/game/play/${response.text}`)
        .expect(200);

      expect(response.text).toEqual('2');

      response = await request(app.getHttpServer())
        .get(`/game/play/${response.text}`)
        .expect(200);

      expect(response.text).toEqual('1');
    });
  });
});
