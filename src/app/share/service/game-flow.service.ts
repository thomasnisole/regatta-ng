import { Injectable } from '@angular/core';
import * as _ from 'underscore/underscore';
import { AbstractCard } from '../model/abstract-card';

import {Player} from '../model/player';
import {PlayerStatus} from '../model/player-status.enum';

@Injectable()
export class GameFlowService {

  public constructor() { }

  public canTrap(player: Player): boolean {
    return player.status === PlayerStatus.MOVE_PLAYED && _.filter(player.cards, (c: AbstractCard) => c.isTrapCard()).length > 0;
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
}
