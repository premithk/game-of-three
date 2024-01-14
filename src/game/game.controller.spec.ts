import { Test, TestingModule } from '@nestjs/testing';
import { GameException } from './exceptions/game.exception';
import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('GameController', () => {
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();

    gameController = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
  });

  describe('startGame', () => {
    it('should return a random number when starting the game', () => {
      const randomNumber = 42;
      jest.spyOn(gameService, 'startGame').mockReturnValue(randomNumber);

      const result = gameController.startGame();
      expect(result).toEqual(randomNumber);
    });
  });

  describe('playTurn', () => {
    it('should call playTurn in GameService with the provided number', () => {
      const providedNumber = 56;
      const expectedResult = 19;

      jest
        .spyOn(gameService, 'playTurn')
        .mockReturnValue({ result: expectedResult, added: 1 });

      const result = gameController.playTurn(providedNumber);

      expect(gameService.playTurn).toHaveBeenCalledWith(providedNumber);
      expect(result).toEqual({ result: expectedResult, added: 1 });
    });
  });

  describe('isGameOver', () => {
    it('should handle GameException when game is not started', () => {
      jest.spyOn(gameService, 'isGameOver').mockImplementation(() => {
        throw new GameException('Game has not been started.');
      });

      expect(() => gameController.isGameOver()).toThrowError(GameException);
    });

    it('should handle other exceptions', () => {
      jest.spyOn(gameService, 'isGameOver').mockImplementation(() => {
        throw new Error('Some error');
      });

      expect(() => gameController.isGameOver()).toThrowError(
        'Internal Server Error',
      );
    });

    it('should return the result of isGameOver in GameService', () => {
      const expectedIsGameOverResult = true;
      jest
        .spyOn(gameService, 'isGameOver')
        .mockReturnValue(expectedIsGameOverResult);

      const result = gameController.isGameOver();
      expect(result).toEqual(expectedIsGameOverResult);
    });
  });
});
