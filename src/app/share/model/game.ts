import {Player} from './player';
import {Board} from './board';
import {JsonProperty} from 'json-typescript-mapper';
import {dateConverter} from '../converter/date-converter';
import {FbObjectsToArrayConverter} from '../converter/fb-objects-to-array';
import {GameStatus} from "./game-status.enum";
import {enumConverter} from '../converter/enum-converter';
import {Boat} from './boat';

export class Game {
  public static readonly STATES: {
    WAITING: 'waiting',
    STARTED: 'started',
    FINISHED: 'finished'
  };

  @JsonProperty('$key')
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

  public isCurrentPlayer(player: Player): boolean {
    if (!this.currentPlayer) {
      return false;
    }

    return player.boat.boatNumber === this.currentPlayer.boat.boatNumber;
  }

  public isCurrentBoat(boat: Boat): boolean {
    if (!this.currentPlayer) {
      return false;
    }

    return boat.boatNumber === this.currentPlayer.boat.boatNumber;
  }
}
