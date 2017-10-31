import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GameService} from '../../share/service/game.service';
import {Observable} from 'rxjs/Observable';
import {Game} from '../../share/model/game';
import 'rxjs/operator/mergeMap';
import {environment} from '../../../environments/environment';
import * as _ from 'underscore/underscore';
import {Player} from '../../share/model/player';
import {Point} from '../../share/model/point';
import {Buoy} from '../../share/model/buoy';
import {SeaElement} from '../../share/model/sea-element';
import {Boat} from '../../share/model/boat';
import { AbstractCard } from '../../share/model/abstract-card';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public game: Game;

  public caseWidth: number = environment.board.caseDimensions.width;

  public caseHeight: number = environment.board.caseDimensions.height;

  public elements: Point[];


  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => this.gameService
        .findById(params['id'])
        .subscribe(
          (game: Game) => {
            this.game = game;
            if (game.isFinished()) {
              this.router.navigate(['/board/' + game.id + '/end']);
            }

            if (game.isStarted()) {
              this.makeElements(game);
            }
          },
          (err: Error) => this.router.navigate(['/board'])
        )
    );
  }

  public start(game: Game): void {
    this.gameService.start(game).subscribe();
  }

  private makeElements(game: Game): void {
    this.elements = _.union(
      game.board.seaElements,
      game.board.buoys,
      _.map(game.players, (player: Player) => {
        player.y = player.boat.y;
        return player;
      })
    );
  }

  public isBuoy(obj: Buoy): boolean {
    return obj instanceof Buoy;
  }

  public isSeaElement(obj: SeaElement): boolean {
    return obj instanceof SeaElement;
  }

  public isBoat(obj: Boat): boolean {
    return obj instanceof Boat;
  }

  public get cardsToPreview(): AbstractCard[] {
    return _.sortBy(
      _.filter(this.game.getCurrentPlayer().cards, (card: AbstractCard) => card.previewOrder),
      (card: AbstractCard) => card.previewOrder
    );
  }
}
