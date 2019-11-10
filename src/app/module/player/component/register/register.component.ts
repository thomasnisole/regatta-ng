import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {GameService} from '../../../@core/service/game.service';
import {User} from '../../../@core/model/user.model';
import {catchError, map} from 'rxjs/operators';
import {PlayerService} from '../../../@core/service/player.service';
import {UserService} from '../../../@core/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public game$: Observable<Game>;

  public user$: Observable<User>;

  public colors: any[] = [
    {
      name: 'blue',
      hexa: '#1F4788'
    },
    {
      name: 'red',
      hexa: '#8F1D21'
    },
    {
      name: 'yellow',
      hexa: '#FFB61E'
    },
    {
      name: 'green',
      hexa: '#26A65B'
    },
    {
      name: 'purple',
      hexa: '#8E44AD'
    }
  ];

  public selectedColor: {name: string, hexa: string};

  public boatNumber: number;

  public constructor(gameService: GameService,
                     userService: UserService,
                     private playerService: PlayerService,
                     private router: Router) {
    this.game$ = gameService.findCurrentGame().pipe(
      catchError(() => from(this.router.navigate(['/', 'player'])).pipe(
        map(() => null)
      ))
    );

    this.user$ = userService.findUserAccount();
  }

  public onSubmit(game: Game, user: User): void {
    this.playerService.addPlayerToGame(game, user, this.selectedColor.hexa, this.boatNumber).subscribe(
      () => this.router.navigate(['/', 'player', 'games', game.id, 'play'])
    );
  }
}
