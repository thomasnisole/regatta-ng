import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Game} from '../../share/model/game';
import {GameService} from '../../share/service/game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  public games: Observable<Game[]>;

  public constructor(private gameService: GameService) { }

  public ngOnInit(): void {
    this.games = this.gameService.findAllWaiting().share();
  }
}
