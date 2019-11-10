import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../@core/model/user.model';
import {Game} from '../../../@core/model/game.model';
import {Select} from '@ngxs/store';
import {GameService} from '../../../@core/service/game.service';
import {Observable} from 'rxjs';
import { UserService } from 'src/app/module/@core/service/user.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html'
})
export class CreateGameComponent {

  public user$: Observable<User>;

  public game: Game = new Game();

  public constructor(private userService: UserService,
                     private gameService: GameService,
                     private router: Router) {
    this.user$ = this.userService.findUserAccount();
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
