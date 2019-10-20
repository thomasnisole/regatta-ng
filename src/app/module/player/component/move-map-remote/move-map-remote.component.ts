import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../../@core/model/game.model';

@Component({
  selector: 'app-move-map-remote',
  templateUrl: './move-map-remote.component.html'
})
export class MoveMapRemoteComponent implements OnInit {

  @Input()
  public isVisible: boolean;

  @Input()
  public game: Game;

  public constructor() { }

  public ngOnInit(): void {

  }

  public moveLeft(): void {
    // this.boardService.moveMap(this.game.board, -10, 0);
    // this.boardService.update(this.game.board, this.game);
  }

  public moveRight(): void {
    // this.boardService.moveMap(this.game.board, 10, 0);
    // this.boardService.update(this.game.board, this.game);
  }

  public moveTop(): void {
    // this.boardService.moveMap(this.game.board, 0, -10);
    // this.boardService.update(this.game.board, this.game);
  }

  public moveBottom(): void {
    // this.boardService.moveMap(this.game.board, 0, 10);
    // this.boardService.update(this.game.board, this.game);
  }

  public zoomIn(): void {
    // this.boardService.zoomMap(this.game.board, -10);
    // this.boardService.update(this.game.board, this.game);
  }

  public zoomOut(): void {
    // this.boardService.zoomMap(this.game.board, 10);
    // this.boardService.update(this.game.board, this.game);
  }

  public reset(): void {
    // this.boardService.resetOnCurrentPlayer(this.game);
    // this.boardService.update(this.game.board, this.game);
  }
}
