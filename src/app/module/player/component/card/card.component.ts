import {Component, Input} from '@angular/core';
import {Card} from '../../../@core/model/card.model';
import {Possibility} from '../../../@core/model/possibility.model';
import {ModeState} from '../../state/mode/mode.state';
import {Select} from '@ngxs/store';
import {combineLatest, Observable} from 'rxjs';
import {CurrentGameIdState} from '../../../@core/state/current-game-id/current-game-id.state';
import {GameService} from '../../../@core/service/game.service';
import {Game} from '../../../@core/model/game.model';
import {map} from 'rxjs/operators';
import {PlayerService} from '../../../@core/service/player.service';
import {Player} from '../../../@core/model/player.model';
import {hotShareReplay} from '../../../@system/rx-operator/hot-share-replay.operator';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Select(ModeState)
  public mode$: Observable<string>;

  @Input()
  public card: Card;

  public canDisplayPossibilities$: Observable<boolean>;

  public constructor(gameService: GameService, playerService: PlayerService) {
    this.canDisplayPossibilities$ = combineLatest(
      gameService.findCurrentGame(),
      playerService.findCurrentPayer()
    ).pipe(
      map(([game, player]: [Game, Player]) => {
        if (!game.isStarted()) {
          return false;
        }

        if (game.currentPlayer !== player.id) {
          return false;
        }

        return player.isWaitingToPlay();
      }),
      hotShareReplay(1)
    );
  }

  public onClickOnPossibility(possibility: number): void {

  }

  public isPossibilitySelectable(index: number): boolean {
    if (!this.card.possibilities) {
      return false;
    }

    return this.card.possibilities.filter((possibility: Possibility) => possibility.index === index).length > 0;
  }
}
