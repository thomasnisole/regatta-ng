import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore/underscore';
import { Game } from '../../share/model/game';
import { Player } from '../../share/model/player';
import { GameService } from '../../share/service/game.service';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss']
})
export class EndGameComponent implements OnInit {

  public game: Observable<Game>;

  public constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => this.game = this.gameService
      .findById(params['id'])
      .do((g: Game) => {
        if (g.players.length === 0) {
          this.router.navigate(['/board']);
        }
      })
    );
  }

  public getPlayer(game: Game, arrivingOrder: number): Player {
    return _.find(game.players, (p: Player) => p.arrivingOrder === arrivingOrder);
  }
}
