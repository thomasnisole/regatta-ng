import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Game} from '../../../@core/model/game.model';
import {from, Observable} from 'rxjs';
import {GameService} from '../../../@core/service/game.service';
import {catchError, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss']
})
export class EndGameComponent {

  public game$: Observable<Game>;

  public constructor(gameService: GameService,
                     router: Router) {
    this.game$ = gameService.findCurrentGame().pipe(
      tap((game: Game) => game.isFinished() ? router.navigate(['/board/' + game.id + '/end']) : void 0),
      catchError(() => from(router.navigate(['/board'])).pipe(
        map(() => null)
      ))
    );
  }
}
