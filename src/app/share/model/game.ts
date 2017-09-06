import {Player} from './player';
import {Board} from './board';
import {JsonProperty} from 'json-typescript-mapper';
import {dateConverter} from '../converter/date-converter';
import {FbObjectsToArrayConverter} from '../converter/fb-objects-to-array';
import {GameStatus} from './game-status.enum';
import {enumConverter} from '../converter/enum-converter';
import {Boat} from './boat';
import * as _ from 'underscore/underscore';
import {Card} from './card';

export class Game {
  public static readonly STATES: {
    WAITING: 'waiting',
    STARTED: 'started',
    FINISHED: 'finished'
  };

  @JsonProperty({name: '$key', excludeToJson: true})
  public id: string = void 0;

  @JsonProperty('name')
  public name: string = void 0;

  @JsonProperty('password')
  public password: string = void 0;

  @JsonProperty('currentPlayer')
  public currentPlayer: Player = null;

  @JsonProperty({name: 'status', customConverter: enumConverter})
  public status: GameStatus = void 0;

  @JsonProperty({name: 'players', clazz: Player, customConverter: new FbObjectsToArrayConverter<Player>(Player)})
  public players: Player[] = [];

  @JsonProperty('board')
  public board: Board = void 0;

  @JsonProperty({name: 'cards', clazz: Card})
  public cards: Card[] = [];

  @JsonProperty({name: 'droppedCards', clazz: Card})
  public droppedCards: Card[] = [];

  @JsonProperty({name: 'previewCards', clazz: Card})
  public previewCards: Card[] = [];

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

  public getCurrentPlayer(): Player {
    return _.find(this.players, (player: Player) => this.isCurrentPlayer(player));
  }

  public getPlayerByUserId(userId: string): Player {
    return _.find(this.players, (player: Player) => player.userId === userId);
  }

  public getPlayerByPlayerId(playerId: string): Player {
    return _.find(this.players, (player: Player) => player.id === playerId);
  }

  public isCurrentPlayer(player: Player): boolean {
    if (!this.currentPlayer) {
      return false;
    }

    return player.userId === this.currentPlayer.userId;
  }

  public isCurrentBoat(boat: Boat): boolean {
    if (!this.currentPlayer) {
      return false;
    }

    return boat.boatNumber === this.currentPlayer.boat.boatNumber;
  }
}
