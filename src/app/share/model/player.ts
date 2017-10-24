import {JsonProperty} from 'json-typescript-mapper';
import {FbIdentifiable} from './fb-identifiable';
import { enumConverter } from '../converter/enum-converter';
import { PlayerStatus } from './player-status.enum';
import {Boat} from './boat';
import {Line} from './line';
import * as _ from 'underscore/underscore';
import { cardConverter } from '../converter/card-converter';
import { AbstractCard } from './abstract-card';

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

  @JsonProperty({name: 'cards', customConverter: cardConverter})
  public cards: AbstractCard[] = [];

  @JsonProperty('nextPlayer')
  public nextPlayer: string = void 0;

  @JsonProperty('isTrap')
  public isTrap: boolean = void 0;

  @JsonProperty('arrivingOrder')
  public arrivingOrder: number = void 0;

  @JsonProperty('photoUrl')
  public photoUrl: string = void 0;

  @JsonProperty('cardPlayedCount')
  public cardPlayedCount: number = void 0;

  public y: number;

  public isWaitingToStart(): boolean {
    return this.status === PlayerStatus.WAITING_TO_START;
  }

  public isStarted(): boolean {
    return this.status === PlayerStatus.WAITING_TO_PLAY
        || this.status === PlayerStatus.MOVE_PLAYED
        || this.status === PlayerStatus.TERMINATED;
  }

  public isArrived(): boolean {
    return this.status === PlayerStatus.FINISHED;
  }

  public hasPreviewedCards(): boolean {
    return _.filter(this.cards, (c: AbstractCard) => c.previewPossibilities).length > 0;
  }
}
