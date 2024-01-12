import { Injectable } from '@nestjs/common';
import { GameException } from './exceptions/game.exception';

@Injectable()
export class GameService {
  private number: number;
  private gameStarted: boolean = false;

  startGame(): number {
    this.number = Math.floor(Math.random() * 1000) + 1;
    this.gameStarted = true;
    return this.number;
  }

  playTurn(providedNumber: number): number {
    if (!this.gameStarted) {
      this.gameStarted = true; //Game started by the other instance
    }
    const remainder = providedNumber % 3;
    const adder = remainder === 0 ? 0 : remainder === 1 ? -1 : 1;
    this.number = (providedNumber + adder) / 3;
    return this.number;
  }

  isGameOver(): boolean {
    if (!this.gameStarted) {
      throw new GameException(
        'Game has not been started. Call /game/start to start the game.',
      );
    }
    return this.number === 1;
  }
}
