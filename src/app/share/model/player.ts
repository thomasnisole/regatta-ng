import {JsonProperty} from 'json-typescript-mapper';
import {FbIdentifiable} from './fb-identifiable';
import {enumConverter} from '../converter/enum-converter';
import {PlayerStatus} from './player-status.enum';
import {Boat} from './boat';
import {Line} from './line';
import {Card} from './card';

export class Player extends FbIdentifiable {

  @JsonProperty('userId')
  public userId: string = void 0;

  @JsonProperty('name')
  public name: string = void 0;

  @JsonProperty({name: 'status', customConverter: enumConverter})
  public status: PlayerStatus = void 0;

  @JsonProperty('boat')
  public boat: Boat = void 0;

  @JsonProperty({name: 'checkLines', clazz: Line})
  public checkLines: Line[] = [];

  @JsonProperty('cards')
  public cards: Card[] = [];

  public y: number;

  public isWaitingToStart(): boolean {
    return this.status === PlayerStatus.WAITING_TO_START;
  }

  public isStarted(): boolean {
    return this.status > PlayerStatus.WAITING_TO_START;
  }
}
