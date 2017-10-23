import { Injectable } from '@angular/core';
import {Player} from '../model/player';
import * as _ from 'underscore/underscore';
import {PlayerStatus} from '../model/player-status.enum';
import {CardType} from '../model/card-type.enum';
import { AbstractCard } from '../model/abstract-card';

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
