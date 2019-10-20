import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {GameService} from '../../@core/service/game.service';
import {Store} from '@ngxs/store';
import {SetCurrentGameAction} from '../state/current-game/set-current-game.action';
import {Observable} from 'rxjs';
import {Game} from '../../@core/model/game.model';
import {mergeMap, take} from 'rxjs/operators';

@Injectable()
export class SetCurrentGameResolve implements Resolve<any> {

  public constructor(private gameService: GameService,
                     private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.gameService.findById(route.params.gameId).pipe(
      mergeMap((game: Game) => this.store.dispatch(new SetCurrentGameAction(game))),
      take(1)
    );
  }
}
