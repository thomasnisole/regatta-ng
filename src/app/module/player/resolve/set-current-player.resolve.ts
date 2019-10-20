import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {PlayerService} from '../../@core/service/player.service';
import {User} from '../../@core/model/user.model';
import {CurrentUserState} from '../state/current-user/current-user.state';
import {SetCurrentPlayerAction} from '../state/current-player/set-current-player.action';
import {Player} from '../../@core/model/player.model';

@Injectable()
export class SetCurrentPlayerResolve implements Resolve<any> {

  @Select(CurrentUserState)
  public user$: Observable<User>;

  public constructor(private playerService: PlayerService,
                     private store: Store) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.user$.pipe(
      mergeMap((user: User) => this.playerService.findByGameIdAndUserUid(route.params.gameId, user.uid)),
      mergeMap((player: Player) => this.store.dispatch(new SetCurrentPlayerAction(player))),
      take(1)
    );
  }
}
