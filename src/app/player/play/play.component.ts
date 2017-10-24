import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../share/service/game.service';
import {UserService} from '../../share/service/user.service';
import {Observable} from 'rxjs/Rx';
import {Game} from '../../share/model/game';
import {User} from '../../share/model/user';
import {Player} from '../../share/model/player';
import {CardService} from '../../share/service/card.service';
import {PlayerService} from '../../share/service/player.service';
import * as _ from 'underscore/underscore';
import {GameFlowService} from '../../share/service/game-flow.service';
import {environment} from '../../../environments/environment';
import {ActionNavBarComponent} from '../action-nav-bar/action-nav-bar.component';
import { AbstractCard } from '../../share/model/abstract-card';
import { CloudCard } from '../../share/model/cloud-card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  public game: Game;

  public user: User;

  public player: Observable<Player>;

  public canPlay: boolean = true;

  public firstLoad: boolean = true;

  @ViewChild(ActionNavBarComponent)
  public actionNavBar: ActionNavBarComponent;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService,
    private cardService: CardService,
    private playerService: PlayerService,
    protected gameFlowService: GameFlowService,
    private modalService: NgbModal) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.player = this.userService
          .findUserAccount()
          .do((user: User) => this.user = user)
          .flatMap((user: User) => this.gameService
            .findById(params['id'])
            .do((game: Game) => this.game = game)
            .map((game: Game) => game.getPlayerByUserId(user.id))
          )
          .do((player: Player) => {
            if (this.firstLoad) {
              // this.clearPreview(player);
              this.firstLoad = false;
            }
          });
      }
    );
  }

  public tack(player: Player, degres: number, modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.clearPreview(player);
      this.playerService.tack(player, degres);
      this.playerService.update(player, this.game);

      this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
      this.gameService.update(this.game);
    });
  }

  public dropCards(player: Player, modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.playerService.clearPreview(player);
      const cardsToDrop: AbstractCard[] = _.filter(player.cards, (card: AbstractCard) => card.selectedToDrop);

      this.playerService.dropCards(player, this.game, cardsToDrop);
      this.playerService.takeCards(player, this.game, cardsToDrop.length);

      this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
      this.gameService.update(this.game);
      this.actionNavBar.changeToPlayMode();
    });
  }

  public canTerminateCurrentAction(player: Player, mode: string): boolean {
    if (mode === 'trash') {
      const cardsToDrop = _.filter(player.cards, (card: AbstractCard) => card.selectedToDrop);

      return cardsToDrop.length <= 3 && cardsToDrop.length > 0;
    }

    if (mode === 'play') {
      const cardsInPreview = _.sortBy(_.filter(player.cards, (c: AbstractCard) => c.previewPossibilities), 'previewOrder');
      return cardsInPreview.length > 0 && this.canPlay &&
        (
          !(_.last(cardsInPreview) instanceof CloudCard) ||
          (_.last(cardsInPreview) instanceof CloudCard && _.last(cardsInPreview).previewPossibilities.length === 2)
        );
    }

    if (mode === 'trap') {
      return true;
    }

    return false;
  }

  public canDisplayPossibilities(player: Player, card: AbstractCard, mode: string): boolean {
    if (mode !== 'play') {
      return false;
    }

    if (!this.canPlay) {
      return false;
    }

    return this.cardService.canDisplayPossibilities(player, card);
  }

  public previewCard(card: AbstractCard, player: Player): void {
    this.canPlay = this.playerService.previewCard(this.game, player, card);
    this.playerService.update(player, this.game);
  }

  public clearPreview(player: Player): void {
    this.canPlay = true;
    this.playerService.clearPreview(player);
    this.playerService.update(player, this.game);
  }

  public play(player: Player, modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.playerService.play(player, this.game);

      if (!this.gameFlowService.canTrap(player)) {
        if (!player.isArrived()) {
          this.playerService.takeCards(player, this.game, environment.cardsCountPerPlayer - player.cards.length);
        } else {
          this.playerService.dropCards(player, this.game, player.cards);
        }

        this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
      } else {
        this.actionNavBar.changeToTrapMode();
      }

      this.gameService.update(this.game);
    });
  }

  public trap(player: Player, modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.playerService.trap(player, this.game);

      this.playerService.takeCards(player, this.game, environment.cardsCountPerPlayer - player.cards.length);
      this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
      this.gameService.update(this.game);
      this.actionNavBar.changeToPlayMode();
    });
  }
}
