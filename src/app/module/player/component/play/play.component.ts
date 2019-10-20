import {Component, OnDestroy} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Player} from '../../../@core/model/player.model';
import {CurrentPlayerState} from '../../state/current-player/current-player.state';
import {Select, Store} from '@ngxs/store';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {CurrentGameState} from '../../state/current-game/current-game.state';
import {PlayerService} from '../../../@core/service/player.service';
import {filter, first, map, mergeMap, switchMap} from 'rxjs/operators';
import {hotShareReplay} from '../../../@system/rx-operator/hot-share-replay.operator';
import {SetCurrentGameAction} from '../../state/current-game/set-current-game.action';
import {SetCurrentPlayerAction} from '../../state/current-player/set-current-player.action';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GameService} from '../../../@core/service/game.service';
import {CurrentUserState} from '../../state/current-user/current-user.state';
import {User} from '../../../@core/model/user.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnDestroy {

  private setCurrentGameSubscription: Subscription;

  private setCurrentPlayerSubscription: Subscription;

  @Select(CurrentPlayerState)
  public player$: Observable<Player>;

  @Select(CurrentGameState)
  public game$: Observable<Game>;

  @Select(CurrentUserState)
  public user$: Observable<User>;

  public players$: Observable<Player[]>;

  public constructor(private modalService: NgbModal,
                     private gameService: GameService,
                     private playerService: PlayerService,
                     private router: Router,
                     private store: Store,
                     route: ActivatedRoute) {
    this.setCurrentGameSubscription = route.params.pipe(
      map((params: Params) => params[`gameId`]),
      switchMap((gameId: string) => this.gameService.findById(gameId)),
      switchMap((game: Game) => this.store.dispatch(new SetCurrentGameAction(game)))
    ).subscribe(
      () => void 0,
      () => this.router.navigate(['/', 'player'])
    );

    this.setCurrentPlayerSubscription = this.game$.pipe(
      filter((game: Game) => !!game),
      switchMap((game: Game) => this.user$.pipe(
        switchMap((user: User) => this.playerService.findByGameIdAndUserUid(game.id, user.uid))
      )),
      switchMap((player: Player) => this.store.dispatch(new SetCurrentPlayerAction(player)))
    ).subscribe();

    this.players$ = this.game$.pipe(
      mergeMap((game: Game) => this.playerService.findByGameId(game.id)),
      hotShareReplay(1)
    );
  }

  public ngOnDestroy(): void {
    this.setCurrentGameSubscription.unsubscribe();
    this.setCurrentPlayerSubscription.unsubscribe();

    forkJoin(
      this.store.dispatch(new SetCurrentGameAction(null)).pipe(first()),
      this.store.dispatch(new SetCurrentPlayerAction(null)).pipe(first())
    ).subscribe();
  }

  public leave(content: any): void {

  }

  public startGame(game: Game): void {
    const modal: NgbModalRef = this.openModal('Démarrer la partie', 'Êtes-vous sûr de vouloir démarrer la partie ?');
    modal.result.then(() => {

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

  public deleteGame(game: Game): void {
    const modal: NgbModalRef = this.openModal('Supprimer la partie', 'Êtes-vous sûr de vouloir supprimer la partie ?');
    modal.result.then(() => {
      this.gameService.delete(game);
    });
  }

  public deletePlayer(player: Player): void {
    const modal: NgbModalRef = this.openModal('Supprimer un joueur', 'Êtes-vous sûr de vouloir supprimer ce joueur ?');
    modal.result.then(() => {
      this.playerService.deletePlayerFromGame(player);
    });
  }

  private openModal(title: string, message: string): NgbModalRef {
    const modal: NgbModalRef = this.modalService.open(ConfirmDialogComponent, {backdrop: 'static'});
    modal.componentInstance.title = title;
    modal.componentInstance.message = message;

    return modal;
  }
}
