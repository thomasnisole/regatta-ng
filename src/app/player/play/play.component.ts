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

  public player: Player;

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
        this.userService
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
          })
          .subscribe(
            (p: Player) => this.player = p
          );
      }
    );
  }

  public tack(degres: number, modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.clearPreview();
      this.playerService.tack(this.player, degres);
      this.playerService.update(this.player, this.game);

      this.gameService.changeCurrentPlayer(this.player.nextPlayer, this.game);
      this.gameService.update(this.game);
    });
  }

  public dropCards(modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.playerService.clearPreview(this.player);
      const cardsToDrop: AbstractCard[] = _.filter(this.player.cards, (card: AbstractCard) => card.selectedToDrop);

      this.playerService.dropCards(this.player, this.game, cardsToDrop);
      this.playerService.takeCards(this.player, this.game, cardsToDrop.length);

      this.gameService.changeCurrentPlayer(this.player.nextPlayer, this.game);
      this.gameService.update(this.game);
      this.actionNavBar.changeToPlayMode();
    });
  }

  public canTerminateCurrentAction( mode: string): boolean {
    if (mode === 'trash') {
      const cardsToDrop = _.filter(this.player.cards, (card: AbstractCard) => card.selectedToDrop);

      return cardsToDrop.length <= 3 && cardsToDrop.length > 0;
    }

    if (mode === 'play') {
      const cardsInPreview = _.sortBy(_.filter(this.player.cards, (c: AbstractCard) => c.previewPossibilities), 'previewOrder');
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

  public canDisplayPossibilities(card: AbstractCard, mode: string): boolean {
    if (mode !== 'play') {
      return false;
    }

    if (!this.canPlay) {
      return false;
    }

    return this.cardService.canDisplayPossibilities(this.player, card);
  }

  public previewCard(card: AbstractCard): void {
    this.canPlay = this.playerService.previewCard(this.game, this.player, card);
    this.playerService.update(this.player, this.game);
  }

  public clearPreview(): void {
    this.canPlay = true;
    this.playerService.clearPreview(this.player);
    this.playerService.update(this.player, this.game);
  }

  public play(modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.playerService.play(this.player, this.game);

      if (!this.gameFlowService.canTrap(this.player)) {
        if (!this.player.isArrived()) {
          this.playerService.takeCards(this.player, this.game, environment.cardsCountPerPlayer - this.player.cards.length);
        } else {
          this.playerService.dropCards(this.player, this.game, this.player.cards);
        }

        this.gameService.changeCurrentPlayer(this.player.nextPlayer, this.game);
      } else {
        this.actionNavBar.changeToTrapMode();
      }

      this.gameService.update(this.game);
    });
  }

  public trap(modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.playerService.trap(this.player, this.game);

      this.playerService.takeCards(this.player, this.game, environment.cardsCountPerPlayer - this.player.cards.length);
      this.gameService.changeCurrentPlayer(this.player.nextPlayer, this.game);
      this.gameService.update(this.game);
      this.actionNavBar.changeToPlayMode();
    });
  }

  public confirmLeave(): void {

  }
}
