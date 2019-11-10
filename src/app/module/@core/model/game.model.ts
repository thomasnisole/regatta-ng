import {JsonProperty, DateConverter} from 'ts-serializer-core';
import {GameStatus} from './game-status.enum';
import {Board} from './board.model';
import {Player} from './player.model';

export class Game {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('name')
  public name: string;

  @JsonProperty('password')
  public password: string;

  @JsonProperty('createdBy')
  public createdBy: string;

  @JsonProperty('status')
  public status: GameStatus;

  @JsonProperty({name: 'createdAt', customConverter: DateConverter})
  public createdAt: Date;

  @JsonProperty('userUids')
  public userUids: string[] = [];

  @JsonProperty('currentPlayer')
  public currentPlayer: string;

  @JsonProperty({name: 'board', type: Board})
  public board: Board;

  public constructor() {
    this.status = GameStatus.WAITING;
  }

  private isStatus(status: GameStatus): boolean {
    return this.status === status;
  }

  public isWaiting(): boolean {
    return this.isStatus(GameStatus.WAITING);
  }

  public isStarted(): boolean {
    return this.isStatus(GameStatus.STARTED);
  }

  public isFinished(): boolean {
    return this.isStatus(GameStatus.FINISHED);
  }

  public isCurrentPlayer(player: Player): boolean {
    if (!this.currentPlayer) {
      return false;
    }

    return this.currentPlayer === player.id;
  }
}
