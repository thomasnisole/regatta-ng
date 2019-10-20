import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {GameService} from '../../../@core/service/game.service';
import {User} from '../../../@core/model/user.model';
import {CurrentUserState} from '../../state/current-user/current-user.state';
import {Select} from '@ngxs/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PlayerService} from '../../../@core/service/player.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public game$: Observable<Game>;

  @Select(CurrentUserState)
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

  public constructor(private activatedRoute: ActivatedRoute,
                     private gameService: GameService,
                     private playerService: PlayerService,
                     private router: Router) { }

  public ngOnInit(): void {
    this.game$ = this.activatedRoute.params.pipe(
      map((params: Params) => params.gameId),
      mergeMap((gameId: string) => this.gameService.findById(gameId)),
      catchError(() => from(this.router.navigate(['/', 'player'])).pipe(
        map(() => null)
      ))
    );
  }

  public onSubmit(game: Game, user: User): void {
    this.playerService.addPlayerToGame(game, user, this.selectedColor.hexa, this.boatNumber).subscribe(
      () => this.router.navigate(['/', 'player', 'games', game.id, 'play'])
    );
  }
}
