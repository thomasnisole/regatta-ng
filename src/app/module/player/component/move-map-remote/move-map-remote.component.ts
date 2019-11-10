import {Component, EventEmitter, Output} from '@angular/core';
import {Player} from '../../../@core/model/player.model';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {GameService} from '../../../@core/service/game.service';
import {PlayerService} from '../../../@core/service/player.service';

@Component({
  selector: 'app-move-map-remote',
  templateUrl: './move-map-remote.component.html'
})
export class MoveMapRemoteComponent {

  private currentPlayer$: Observable<Player>;

  @Output()
  public exit: EventEmitter<void> = new EventEmitter<void>();

  public constructor(private gameService: GameService, playerService: PlayerService) {
    this.currentPlayer$ = playerService.findCurrentPayer();
  }

  public onMoveLeft(): void {
    this.gameService.moveBoard(-10, 0, 0).subscribe();
  }

  public onMoveRight(): void {
    this.gameService.moveBoard(10, 0, 0).subscribe();
  }

  public onMoveTop(): void {
    this.gameService.moveBoard(0, -10, 0).subscribe();
  }

  public onMoveBottom(): void {
    this.gameService.moveBoard(0, 10, 0).subscribe();
  }

  public onZoomIn(): void {
    this.gameService.moveBoard(0, 0, -10).subscribe();
  }

  public onZoomOut(): void {
    this.gameService.moveBoard(0, 0, 10).subscribe();
  }

  public onReset(player: Player): void {
    this.gameService.resetBoardOnPosition(player.boat.x, player.boat.y, environment.board.viewboxHeight).subscribe();
  }

  public onClose(): void {
    this.exit.emit();
  }
}
