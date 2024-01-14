import { Test, TestingModule } from '@nestjs/testing';
import { GameException } from './exceptions/game.exception';
import { GameService } from './game.service';

describe('GameService', () => {
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    gameService = module.get<GameService>(GameService);
  });

  describe('startGame', () => {
    it('should start the game with a random number between 1 and 1000', () => {
      const randomNumber = gameService.startGame();
      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(10000);
    });
  });

  describe('playTurn', () => {
    it('should update the number based on the provided number', () => {
      gameService.startGame();
      const providedNumber = 56;
      const result = gameService.playTurn(providedNumber);

      expect(result).toBeDefined();

      expect(gameService['number']).toEqual(19);
    });
  });

  describe('isGameOver', () => {
    it('should throw GameException when game is not started', () => {
      expect(() => gameService.isGameOver()).toThrowError(GameException);
    });

    it('should throw GameException with correct message when game is not started', () => {
      expect(() => gameService.isGameOver()).toThrowError(
        'Game has not been started. Call /game/start to start the game.',
      );
    });

    it('should return true when the internal number is 1', () => {
      gameService.startGame();
      gameService['number'] = 1;
      const result = gameService.isGameOver();
      expect(result).toBeTruthy();
    });

    it('should return false when the internal number is not 1', () => {
      gameService.startGame();
      gameService['number'] = 5;
      const result = gameService.isGameOver();
      expect(result).toBeFalsy();
    });
  });
});
