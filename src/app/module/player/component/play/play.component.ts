import {Component} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Player} from '../../../@core/model/player.model';
import {from, Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {PlayerService} from '../../../@core/service/player.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {hotShareReplay} from '../../../@system/rx-operator/hot-share-replay.operator';
import {Router} from '@angular/router';
import {GameService} from '../../../@core/service/game.service';
import {CardService} from '../../../@core/service/card.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {

  public moveRemoteIsVisible: boolean = false;

  public placeBoatRemoteIsVisible: boolean = false;

  public player$: Observable<Player>;

  public game$: Observable<Game>;

  public players$: Observable<Player[]>;

  public constructor(private modalService: NgbModal,
                     private gameService: GameService,
                     private playerService: PlayerService,
                     private cardService: CardService,
                     private router: Router) {
    this.game$ = this.gameService.findCurrentGame().pipe(
      catchError(() => from(this.router.navigate(['/', 'player'])).pipe(
        map(() => void 0)
      ))
    );

    this.player$ = this.playerService.findCurrentPayer().pipe(
      catchError(() => from(this.router.navigate(['/', 'player'])).pipe(
        map(() => void 0)
      ))
    );


    this.players$ = this.game$.pipe(
      switchMap((game: Game) => this.playerService.findByGameId(game.id)),
      hotShareReplay(1)
    );
  }

  public canStartGame(game: Game, player: Player, playersLength: number): boolean {
    return game.isWaiting() && player.userUid === game.createdBy && playersLength > 0;
  }

  public leave(game: Game): void {
    const modal: NgbModalRef = this.openModal('Quitter la partie', 'Êtes-vous sûr de vouloir quitter la partie ?');
    modal.result.then(() => {

    }).catch(() => void 0);
  }

  public startGame(game: Game): void {
    const modal: NgbModalRef = this.openModal('Démarrer la partie', 'Êtes-vous sûr de vouloir démarrer la partie ?');
    modal.result.then(() => {
      this.gameService.start(game).subscribe();
    });
  }

  public tack(): void {
    const modal: NgbModalRef = this.openModal('Virer de bord', 'Êtes-vous sûr de vouloir virer de bord ?');
    modal.result.then(() => {

    });
  }

  public trash(): void {
    const modal: NgbModalRef = this.openModal('Défausser des cartes', 'Êtes-vous sûr de vouloir vous défausser de ces cartes ?');
    modal.result.then(() => {

    });
  }

  public move(): void {
    const modal: NgbModalRef = this.openModal('Se déplacer', 'Êtes-vous sûr de vouloir jouer ces cartes de déplacement ?');
    modal.result.then(() => {

    });
  }

  public trap(): void {
    const modal: NgbModalRef = this.openModal('Piéger', 'Êtes-vous sûr de vouloir jouer ces cartes de piège ?');
    modal.result.then(() => {

    });
  }

  public deletePlayer(player: Player): void {
    const modal: NgbModalRef = this.openModal('Supprimer un joueur', 'Êtes-vous sûr de vouloir supprimer ce joueur ?');
    modal.result.then(() => {
      this.playerService.deletePlayerFromGame(player).subscribe();
    });
  }

  public onMoveMap(isVisible: boolean): void {
    this.moveRemoteIsVisible = isVisible;
  }

  public onStart(isVisible: boolean): void {
    this.placeBoatRemoteIsVisible = isVisible;
  }

  private openModal(title: string, message: string): NgbModalRef {
    const modal: NgbModalRef = this.modalService.open(ConfirmDialogComponent, {backdrop: 'static'});
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;

    return modal;
  }
}
