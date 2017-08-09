import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Game} from '../../share/model/game';
import {GameService} from '../../share/service/game.service';
import {UserService} from '../../share/service/user.service';
import {User} from '../../share/model/user';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import {PlayerService} from '../../share/service/player.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public game: Observable<Game>;

  public colors: any[] = [
    {
      name : 'blue',
      hexa : '#1F4788'
    },
    {
      name : 'red',
      hexa : '#8F1D21'
    },
    {
      name : 'yellow',
      hexa : '#FFB61E'
    },
    {
      name : 'green',
      hexa : '#26A65B'
    },
    {
      name : 'purple',
      hexa : '#8E44AD'
    }
  ];

  public selectedColor: any;

  public user: User;

  public boatNumber: number;

  public gameToJoin: Game;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService,
    private playerService: PlayerService) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => this.game = this.userService
        .findUserAccount()
        .do((user: User) => this.user = user)
        .mergeMap((user: User) => this.gameService
          .findById(params['id'])
          .do((game: Game) => this.gameToJoin = game)
        )
    );
  }

  public onSubmit(): void {
    this.playerService.create(this.gameToJoin, this.user, this.boatNumber, this.selectedColor);
  }
}
