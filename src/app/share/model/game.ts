import {Player} from './player';
import {Board} from './board';
import {JsonProperty} from 'json-typescript-mapper';
import {dateConverter} from '../converter/date-converter';
import {FbObjectsToArrayConverter} from '../converter/fb-objects-to-array';
import {GameStatus} from './game-status.enum';
import {enumConverter} from '../converter/enum-converter';
import {Boat} from './boat';
import * as _ from 'underscore/underscore';
import { PlayerStatus } from './player-status.enum';
import { cardConverter } from '../converter/card-converter';
import { AbstractCard } from './abstract-card';

export class Game {
  public static readonly STATES: {
    WAITING: 'waiting',
    STARTED: 'started',
    FINISHED: 'finished'
  };

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string = void 0;

  @JsonProperty('name')
  public name: string = void 0;

  @JsonProperty('password')
  public password: string = void 0;

  @JsonProperty('currentPlayer')
  public currentPlayer: string = null;

  @JsonProperty('author')
  public author: string = void 0;

  @JsonProperty({name: 'status', customConverter: enumConverter})
  public status: GameStatus = void 0;

  @JsonProperty({name: 'players', clazz: Player, customConverter: new FbObjectsToArrayConverter<Player>(Player)})
  public players: Player[] = [];

  @JsonProperty('board')
  public board: Board = void 0;

  @JsonProperty({name: 'cards', customConverter: cardConverter})
  public cards: AbstractCard[] = [];

  @JsonProperty({name: 'droppedCards', customConverter: cardConverter})
  public droppedCards: AbstractCard[] = [];

  @JsonProperty({name: 'createdAt', clazz: Date, customConverter: dateConverter})
  public createdAt: Date = new Date();

  @JsonProperty({name: 'updatedAt', clazz: Date, customConverter: dateConverter})
  public updatedAt: Date = null;

  public constructor() {
    this.status = GameStatus.WAITING;
  }

  public isWaiting(): boolean {
    return this.status === GameStatus.WAITING;
  }

  public isStarted(): boolean {
    return this.status === GameStatus.STARTED;
  }

  public isFinished(): boolean {
    return this.status === GameStatus.FINISHED;
  }

  public getCurrentPlayer(): Player {
    return _.find(this.players, (player: Player) => this.isCurrentPlayer(player));
  }

  public getPlayerByUserId(userId: string): Player {
    return _.find(this.players, (player: Player) => player.userId === userId);
  }

  public getPlayersGaming(): Player[] {
    return _.filter(this.players, (p: Player) =>
      p.status !== PlayerStatus.FINISHED && p.status !== PlayerStatus.WAITING_TO_START
    );
  }

  public getFinishedPlayers(): Player[] {
    return _.filter(this.players, (p: Player) => p.status === PlayerStatus.FINISHED);
  }

  public isCurrentPlayer(player: Player): boolean {
    if (!this.currentPlayer) {
      return false;
    }

    return player.userId === this.currentPlayer;
  }
}
