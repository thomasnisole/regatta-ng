import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../share/service/game.service';
import {UserService} from '../../share/service/user.service';
import {Observable} from 'rxjs/Rx';
import {Game} from '../../share/model/game';
import {User} from '../../share/model/user';
import {Player} from '../../share/model/player';
import {GameFlowService} from '../../share/service/game-flow.service';
import {Card} from '../../share/model/card';
import {PlayerService} from '../../share/service/player.service';
import * as _ from 'underscore/underscore';
import {CardType} from '../../share/model/card-type.enum';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  public game: Game;

  public user: User;

  public player: Observable<Player>;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private userService: UserService,
    protected gameFlowService: GameFlowService,
    private playerService: PlayerService) { }

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
          );
      }
    );
  }

  public tack(player: Player, degres: number): void {
    this.playerService.tack(player, degres);
    this.playerService.update(player, this.game);

    this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
    this.gameService.update(this.game);
  }

  public dropCards(player: Player): void {
    const cardsToDrop: Card[] = _.filter(player.cards, (card: Card) => card.selectedToDrop);

    this.playerService.dropCards(player, this.game, cardsToDrop);
    this.playerService.takeCards(player, this.game, cardsToDrop.length);

    this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
    this.gameService.update(this.game);
  }

  public canTerminateCurrentAction(player: Player, mode: string): boolean {
    if (mode === 'trash') {
      const cardsToDrop = _.filter(player.cards, (card: Card) => card.selectedToDrop);

      return cardsToDrop.length <= 3 && cardsToDrop.length > 0;
    }

    if (mode === 'play') {
      const cardsInPreview = _.sortBy(_.filter(player.cards, (c: Card) => c.previewPossibilities), 'previewOrder');
      return cardsInPreview.length > 0 &&
        (
          !_.last(cardsInPreview).hasCloudOption() ||
          (_.last(cardsInPreview).hasCloudOption() && _.last(cardsInPreview).previewPossibilities.length === 2)
        );
    }

    return false;
  }

  public canDisplayPossibilities(player: Player, card: Card, mode: string): boolean {
    if (card.type === CardType.TRAP) {
      return false;
    }

    if (mode !== 'play') {
      return false;
    }

    if (!this.gameFlowService.canMove(player)) {
      return false;
    }

    const cardsInPreview: Card[] = _.sortBy(_.filter(player.cards, (c: Card) => c.previewPossibilities), 'previewOrder');

    if (card.hasCloudOption()) {
      if (cardsInPreview.length !== 0 &&
        !_.last(cardsInPreview).hasSteeringWheelOption() &&
        _.last(cardsInPreview) !== card) {
        return false;
      }

      if (card.previewPossibilities && card.previewPossibilities.length >= 2) {
        return false;
      }
    } else {
      if (card.previewPossibilities) {
        return false;
      }

      if (cardsInPreview.length !== 0 && !_.last(cardsInPreview).hasSteeringWheelOption()) {
        return false;
      }
    }

    return true;
  }

  public previewCard(card: Card, player: Player): void {
    this.playerService.previewCard(player, card);
    this.playerService.update(player, this.game);
  }

  public clearPreview(player: Player): void {
    _.each(player.cards, (card: Card) => {
      card.previewPossibilities = void 0;
      card.previewOrder = void 0;
      card.xDeparture = void 0;
      card.yDeparture = void 0;
      card.xArriving = void 0;
      card.yArriving = void 0;
      card.orientationDeparture = void 0;
      card.orientationArriving = void 0;
    });

    this.playerService.update(player, this.game);
  }

  public play(player: Player): void {
    this.playerService.play(player, this.game);
    this.playerService.update(player, this.game);
  }
}
