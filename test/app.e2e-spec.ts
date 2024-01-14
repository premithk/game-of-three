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

  const expectedValues = [19, 6, 2, 1];
  const expectedAdded = [1, -1, 0, 1];

  describe('test the entire game flow using a single node', () => {
    beforeAll(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.0055);
    });

    afterAll(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });

    it('starting with 56 the game should be over in 5 steps - including start', async () => {
      let response = await request(app.getHttpServer())
        .get('/game/start')
        .expect(200);

      let currentNumber = parseInt(response.text);
      let added: number;

      expect(currentNumber).toEqual(56);

      for (let i = 0; i < 4; i++) {
        response = await request(app.getHttpServer())
          .get(`/game/play/${currentNumber}`)
          .expect(200);

        currentNumber = response.body.result;
        added = response.body.added;

        expect(currentNumber).toEqual(expectedValues[i]);
        expect(added).toEqual(expectedAdded[i]);
      }

      expect(currentNumber).toEqual(1);

      response = await request(app.getHttpServer())
        .get('/game/gameover')
        .expect(200);

      expect(response.text).toEqual('true');
    });
  });

  describe('test the entire game flow using a two nodes', () => {
    let app2: INestApplication;

    beforeAll(async () => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.0055);

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app2 = moduleFixture.createNestApplication();
      await app2.init();
    });

    afterAll(async () => {
      jest.spyOn(global.Math, 'random').mockRestore();
      await app.close();
    });

    it('starting with 56 the game should be over in 5 steps with each player taking turns', async () => {
      let response = await request(app.getHttpServer())
        .get('/game/start')
        .expect(200);

      expect(response.text).toEqual('56');

      let currentNumber = parseInt(response.text);
      let added: number;

      for (let i = 0; i < 4; i++) {
        const playerNumber = i % 2 === 0 ? app2 : app;

        response = await request(playerNumber.getHttpServer())
          .get(`/game/play/${currentNumber}`)
          .expect(200);

        currentNumber = response.body.result;
        added = response.body.added;

        expect(currentNumber).toEqual(expectedValues[i]);
        expect(added).toEqual(expectedAdded[i]);
      }

      response = await request(app.getHttpServer())
        .get('/game/gameover')
        .expect(200);

      expect(response.text).toEqual('true');
    });
  });
});
