import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Game} from '../../share/model/game';
import {Player} from '../../share/model/player';
import { BoardService } from '../../share/service/board.service';
import {PlayerService} from '../../share/service/player.service';

@Component({
  selector: 'app-place-boat-remote',
  templateUrl: './place-boat-remote.component.html',
  styleUrls: ['./place-boat-remote.component.scss']
})
export class PlaceBoatRemoteComponent implements OnInit {

  @Input()
  public isVisible: boolean;

  @Input()
  public game: Game;

  @Input()
  public player: Player;

  public constructor(
    private playerService: PlayerService,
    private boardService: BoardService,
    private modalService: NgbModal) { }

  public ngOnInit(): void {

  }

  private checkPlayer() {
    if (this.player.isStarted()) {
      return false;
    }

    if (!this.game.isCurrentPlayer(this.player)) {
      return false;
    }

    return true;
  }

  public moveLeft(): void {
    this.checkPlayer();

    this.playerService.moveBoat(this.player.boat, -1, 0, 0);
    this.playerService.update(this.player, this.game);
  }

  public moveRight(): void {
    this.checkPlayer();

    this.playerService.moveBoat(this.player.boat, 1, 0, 0);
    this.playerService.update(this.player, this.game);
  }

  public moveTop(): void {
    this.checkPlayer();

    this.playerService.moveBoat(this.player.boat, 0, -1, 0);
    this.playerService.update(this.player, this.game);
  }

  public moveBottom(): void {
    this.checkPlayer();

    this.playerService.moveBoat(this.player.boat, 0, 1, 0);
    this.playerService.update(this.player, this.game);
  }

  public rotateLeft(): void {
    this.checkPlayer();

    this.playerService.moveBoat(this.player.boat, 0, 0, -90);
    this.playerService.update(this.player, this.game);
  }

  public rotateRight(): void {
    this.checkPlayer();

    this.playerService.moveBoat(this.player.boat, 0, 0, 90);
    this.playerService.update(this.player, this.game);
  }

  public validPosition(modalContent): void {
    if (!this.game.board.isInDeparture(this.player)) {
      return;
    }

    if (!this.boardService.checkBoatPosition(this.game, this.player.boat)) {
      return;
    }

    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.checkPlayer();

      if (this.playerService.startPlayer(this.player, this.game)) {
        this.playerService.update(this.player, this.game);
        this.isVisible = false;
      }
    });
  }
}
