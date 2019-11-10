import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {GameService} from '../../../@core/service/game.service';
import {hotShareReplay} from '../../../@system/rx-operator/hot-share-replay.operator';
import {User} from '../../../@core/model/user.model';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../../@core/service/user.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html'
})
export class JoinComponent {

  public games$: Observable<Game[]>;

  public constructor(userService: UserService, gameService: GameService) {
    this.games$ = userService.findUserAccount().pipe(
      switchMap((user: User) => gameService.findAllWaiting(user)),
      hotShareReplay(1)
    );
  }
}
