import {Component, EventEmitter, Output} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Game} from '../../../@core/model/game.model';
import {Player} from '../../../@core/model/player.model';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {GameService} from '../../../@core/service/game.service';
import {PlayerService} from '../../../@core/service/player.service';
import {BoardService} from '../../../@core/service/board.service';
import {filter, first, tap} from 'rxjs/operators';

@Component({
  selector: 'app-place-boat-remote',
  templateUrl: './place-boat-remote.component.html',
})
export class PlaceBoatRemoteComponent {

  public game$: Observable<Game>;

  public player$: Observable<Player>;

  @Output()
  public exit: EventEmitter<void> = new EventEmitter<void>();

  public constructor(private boardService: BoardService,
                     private gameService: GameService,
                     private store: Store,
                     private modalService: NgbModal,
                     private playerService: PlayerService) {
    this.game$ = this.gameService.findCurrentGame();
    this.player$ = this.playerService.findCurrentPayer();
  }

  public onMoveLeft(): void {
    this.playerService.moveBoat(-1, 0, 0).subscribe();
  }

  public onMoveRight(): void {
    this.playerService.moveBoat(1, 0, 0).subscribe();
  }

  public onMoveTop(): void {
    this.playerService.moveBoat(0, -1, 0).subscribe();
  }

  public onMoveBottom(): void {
    this.playerService.moveBoat(0, 1, 0).subscribe();
  }

  public onRotateLeft(): void {
    this.playerService.moveBoat(0, 0, -90).subscribe();
  }

  public onRotateRight(): void {
    this.playerService.moveBoat(0, 0, 90).subscribe();
  }

  public onClose(): void {
    this.exit.emit();
  }

  public onValidPosition(player: Player, game: Game): void {
    if (!this.boardService.validateBoatDeparturePosition(player.boat, game.board.departureArea)) {
      return;
    }

    this.boardService.validateBoatPosition(game, player.boat, this.playerService.findByGameId(game.id)).pipe(
      filter((checking: boolean) => !!checking),
      first()
    ).subscribe(
      () => {
        const modal: NgbModalRef = this.modalService.open(ConfirmDialogComponent, {backdrop: 'static'});
        modal.componentInstance.title = 'Prendre le départ';
        modal.componentInstance.message = 'Êtes-vous sûr de vouloir prendre le départ depuis cette position ?';
        modal.result.then(
          () => this.playerService.start(player).subscribe(() => this.onClose()),
          () => this.onClose()
        );
      }
    );
  }
}
