import { Injectable } from '@angular/core';
import {Player} from '../model/player';
import * as _ from 'underscore/underscore';
import {PlayerStatus} from '../model/player-status.enum';

@Injectable()
export class GameFlowService {

  public constructor() { }

  public canTrap(player: Player): boolean {
    return _.indexOf(
      [PlayerStatus.MOVE_PLAYED, PlayerStatus.MOVE_SW_PLAYED, PlayerStatus.MOVE_CLOUD_PLAYED],
      player.status
    ) !== -1;
  }

  public canDropCard(player: Player): boolean {
    return player.status === PlayerStatus.WAITING_TO_PLAY;
  }

  public canMove(player: Player): boolean {
    return player.status === PlayerStatus.WAITING_TO_PLAY;
  }

  public canTack(player: Player): boolean {
    return player.status === PlayerStatus.WAITING_TO_PLAY;
  }

  public canTerminate(player: Player): boolean {
    return _.indexOf(
        [
          PlayerStatus.MOVE_PLAYED,
          PlayerStatus.MOVE_SW_PLAYED,
          PlayerStatus.MOVE_CLOUD_PLAYED,
          PlayerStatus.CARD_DROPPED,
          PlayerStatus.TRAP_PLAYED,
          PlayerStatus.TACKED
        ],
        player.status
      ) !== -1;
  }
}
