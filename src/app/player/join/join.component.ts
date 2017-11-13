import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Game } from '../../share/model/game';
import { GameService } from '../../share/service/game.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  public games: Observable<Game[]>;

  public constructor(private gameService: GameService) { }

  public ngOnInit(): void {
    this.games = this.gameService.findAllWaiting().share();
  }
}
