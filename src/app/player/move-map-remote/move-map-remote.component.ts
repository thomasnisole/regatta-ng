import {Component, Input, OnInit} from '@angular/core';
import {Game} from '../../share/model/game';
import {BoardService} from '../../share/service/board.service';

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

  public constructor(private boardService: BoardService) { }

  public ngOnInit(): void {

  }

  public moveLeft(): void {
    this.boardService.moveMap(this.game.board, -10, 0);
    this.boardService.update(this.game.board, this.game);
  }

  public moveRight(): void {
    this.boardService.moveMap(this.game.board, 10, 0);
    this.boardService.update(this.game.board, this.game);
  }

  public moveTop(): void {
    this.boardService.moveMap(this.game.board, 0, -10);
    this.boardService.update(this.game.board, this.game);
  }

  public moveBottom(): void {
    this.boardService.moveMap(this.game.board, 0, 10);
    this.boardService.update(this.game.board, this.game);
  }

  public zoomIn(): void {
    this.boardService.zoomMap(this.game.board, -10);
    this.boardService.update(this.game.board, this.game);
  }

  public zoomOut(): void {
    this.boardService.zoomMap(this.game.board, 10);
    this.boardService.update(this.game.board, this.game);
  }

  public reset(): void {
    this.boardService.resetOnCurrentPlayer(this.game);
    this.boardService.update(this.game.board, this.game);
  }
}
