import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {GameService} from '../../../@core/service/game.service';
import {hotShareReplay} from '../../../@system/rx-operator/hot-share-replay.operator';
import {CurrentUserState} from '../../state/current-user/current-user.state';
import {User} from '../../../@core/model/user.model';
import {Select} from '@ngxs/store';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html'
})
export class JoinComponent implements OnInit {

  @Select(CurrentUserState)
  public user$: Observable<User>;

  public games$: Observable<Game[]>;

  public constructor(private gameService: GameService) { }

  public ngOnInit(): void {
    this.games$ = this.user$.pipe(
      mergeMap((user: User) => this.gameService.findAllWaiting(user)),
      hotShareReplay(1)
    );
  }
}
