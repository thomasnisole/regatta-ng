import {JsonProperty} from 'ts-serializer-core';
import {PlayerStatus} from './player-status.enum';
import {Boat} from './boat.model';

export class Player {

  @JsonProperty({name: 'id', excludeToJson: true})
  public id: string;

  @JsonProperty('userUid')
  public userUid: string;

  @JsonProperty('name')
  public name: string;

  @JsonProperty({name: 'boat', type: Boat})
  public boat: Boat;

  @JsonProperty({name: 'gameId', excludeToJson: true})
  public gameId: string;

  @JsonProperty('status')
  public status: PlayerStatus;

  public isWaitingToStart(): boolean {
    return this.status === PlayerStatus.WAITING_TO_START;
  }

  public isWaitingToPlay(): boolean {
    return this.status === PlayerStatus.WAITING_TO_PLAY;
  }

  public isMovePlayed(): boolean {
    return this.status === PlayerStatus.MOVE_PLAYED;
  }

  public isTerminated(): boolean {
    return this.status === PlayerStatus.TERMINATED;
  }

  public isArrived(): boolean {
    return this.status === PlayerStatus.ARRIVED;
  }

  public isStarted(): boolean {
    return this.isWaitingToPlay()
      || this.isMovePlayed()
      || this.isTerminated();
  }
}
