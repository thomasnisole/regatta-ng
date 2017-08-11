import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../share/model/game';
import {GameService} from '../../share/service/game.service';

@Component({
  selector: 'app-move-map-remote',
  templateUrl: './move-map-remote.component.html',
  styleUrls: ['./move-map-remote.component.scss']
})
export class MoveMapRemoteComponent implements OnInit {

  @Input()
  public isVisible: boolean;

  @Input()
  public game: Game;

  public constructor(private gameService: GameService) { }

  public ngOnInit(): void {

  }

  public moveLeft(): void {
    this.gameService.moveMap(this.game, -10, 0);
    this.gameService.update(this.game);
  }

  public moveRight(): void {
    this.gameService.moveMap(this.game, 10, 0);
    this.gameService.update(this.game);
  }

  public moveTop(): void {
    this.gameService.moveMap(this.game, 0, -10);
    this.gameService.update(this.game);
  }

  public moveBottom(): void {
    this.gameService.moveMap(this.game, 0, 10);
    this.gameService.update(this.game);
  }

  public zoomIn(): void {
    this.gameService.zoomMap(this.game, -10);
    this.gameService.update(this.game);
  }

  public zoomOut(): void {
    this.gameService.zoomMap(this.game, 10);
    this.gameService.update(this.game);
  }

  public reset(): void {
    this.gameService.resetOnCurrentPlayer(this.game);
    this.gameService.update(this.game);
  }
}
