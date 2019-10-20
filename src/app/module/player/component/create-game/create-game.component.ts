import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../@core/model/user.model';
import {Game} from '../../../@core/model/game.model';
import {CurrentUserState} from '../../state/current-user/current-user.state';
import {Select} from '@ngxs/store';
import {GameService} from '../../../@core/service/game.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html'
})
export class CreateGameComponent {

  @Select(CurrentUserState)
  public user$: Observable<User>;

  public game: Game = new Game();

  public constructor(private gameService: GameService,
                     private router: Router) {
    this.game.name = 'test';
    this.game.password = 'test';
  }

  public onSubmit(user: User): void {
    this.game.createdAt = new Date();
    this.game.createdBy = user.uid;
    this.gameService
      .newGame(this.game)
      .subscribe((gameId: string) => this.router.navigate(['/', 'player', 'games', gameId, 'register']));
  }
}
