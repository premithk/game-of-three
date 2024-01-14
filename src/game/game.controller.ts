import { Controller, Get, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { handleError } from './util/handle_errors';

interface TurnResponseDTO {
  result: number;
  added: number;
}

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('start')
  startGame(): number {
    return this.gameService.startGame();
  }

  @Get('play/:providedNumber')
  playTurn(@Param('providedNumber') providedNumber: number): TurnResponseDTO {
    return this.gameService.playTurn(Number(providedNumber));
  }

  @Get('gameover')
  isGameOver(): boolean {
    try {
      return this.gameService.isGameOver();
    } catch (error) {
      handleError(error);
    }
  }
}
