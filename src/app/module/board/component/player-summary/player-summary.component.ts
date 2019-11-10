import {Component, OnDestroy} from '@angular/core';
import {Game} from '../../../@core/model/game.model';
import {Observable, Subscription} from 'rxjs';
import {PlayerService} from '../../../@core/service/player.service';
import {Player} from '../../../@core/model/player.model';
import {filter, switchMap} from 'rxjs/operators';
import {UserRepository} from '../../../@core/repository/user.repository';
import {User} from '../../../@core/model/user.model';
import {hotShareReplay} from '../../../@system/rx-operator/hot-share-replay.operator';
import {Router} from '@angular/router';
import {GameService} from '../../../@core/service/game.service';

@Component({
  selector: 'app-player-summary',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss']
})
export class PlayerSummaryComponent implements OnDestroy {

  private users$: Observable<User>[] = [];

  private gameRedirectionSubscription: Subscription;

  public players$: Observable<Player[]>;

  public constructor(gameService: GameService,
                     playerService: PlayerService,
                     router: Router,
                     private userService: UserRepository) {
    const game$: Observable<Game> = gameService.findCurrentGame();

    this.players$ = game$.pipe(
      switchMap((game: Game) => playerService.findByGameId(game.id))
    );

    this.gameRedirectionSubscription = game$.pipe(
      filter((game: Game) => !!game && game.isStarted())
    ).subscribe(
      (game: Game) => router.navigate(['/', 'board', game.id, 'board'])
    );
  }

  public ngOnDestroy(): void {
    this.gameRedirectionSubscription.unsubscribe();
  }

  public getUser(uid: string): Observable<User> {
    if (!this.users$[uid]) {
      this.users$[uid] = this.userService.findByUid(uid).pipe(
        hotShareReplay(1)
      );
    }

    return this.users$[uid];
  }
}
