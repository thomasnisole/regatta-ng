import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'underscore/underscore';
import {environment} from '../../../environments/environment';
import { AbstractCard } from '../../share/model/abstract-card';
import { CloudCard } from '../../share/model/cloud-card';
import {Game} from '../../share/model/game';
import {Player} from '../../share/model/player';
import {User} from '../../share/model/user';
import { BoardService } from '../../share/service/board.service';
import {CardService} from '../../share/service/card.service';
import {GameFlowService} from '../../share/service/game-flow.service';
import {GameService} from '../../share/service/game.service';
import {PlayerService} from '../../share/service/player.service';
import {UserService} from '../../share/service/user.service';
import {ActionNavBarComponent} from '../action-nav-bar/action-nav-bar.component';



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
    private boardService: BoardService,
    private userService: UserService,
    private cardService: CardService,
    private playerService: PlayerService,
    protected gameFlowService: GameFlowService,
    private modalService: NgbModal,
    private router: Router) {}

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
          .subscribe(
            (p: Player) => {
              this.player = p;
              if (this.firstLoad) {
                this.clearPreview();
                this.firstLoad = false;
              }
            },
            (err: Error) => this.router.navigate(['/player/games'])
          );
      }
    );
  }

  public startGame(modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.gameService.start(this.game).subscribe();
    });
  }

  public deleteGame(modalContent): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.gameService.delete(this.game);
    });
  }

  public tack(degres: number, modalContent): void {
    const boatTacked = _.clone(this.player.boat);

    this.playerService.moveBoat(boatTacked, 0, 0, degres);
    if (!this.boardService.checkBoatPosition(this.game, boatTacked)) {
      return;
    }

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

  public deletePlayer(modalContent, player: Player): void {
    this.modalService.open(modalContent, {backdrop: 'static'}).result.then((result: string) => {
      if (result === 'no') {
        return;
      }

      this.gameService.deletePlayer(player, this.game);
    });
  }

  public leave(modalContent): void {
    this.modalService.open(modalContent).result.then((result: number) => {
      if (result === 0) {
        return;
      }

      if (result === 2) {
        this.gameService.deletePlayer(this.player, this.game);
      }

      this.router.navigate(['/player']);
    }).catch((err: Error) => void 0);
  }
}
