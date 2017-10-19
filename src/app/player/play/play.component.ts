import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../share/service/game.service';
import {UserService} from '../../share/service/user.service';
import {Observable} from 'rxjs/Rx';
import {Game} from '../../share/model/game';
import {User} from '../../share/model/user';
import {Player} from '../../share/model/player';
import {CardService} from '../../share/service/card.service';
import {Card} from '../../share/model/card';
import {PlayerService} from '../../share/service/player.service';
import * as _ from 'underscore/underscore';
import {GameFlowService} from '../../share/service/game-flow.service';
import {environment} from '../../../environments/environment';
import {ActionNavBarComponent} from '../action-nav-bar/action-nav-bar.component';


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
    protected gameFlowService: GameFlowService) { }

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
              //this.clearPreview(player);
              this.firstLoad = false;
            }
          });
      }
    );
  }

  public tack(player: Player, degres: number): void {
    this.clearPreview(player);
    this.playerService.tack(player, degres);
    this.playerService.update(player, this.game);

    this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
    this.gameService.update(this.game);
  }

  public dropCards(player: Player): void {
    this.playerService.clearPreview(player);
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
      return cardsInPreview.length > 0 && this.canPlay &&
        (
          !_.last(cardsInPreview).hasCloudOption() ||
          (_.last(cardsInPreview).hasCloudOption() && _.last(cardsInPreview).previewPossibilities.length === 2)
        );
    }

    if (mode === 'trap') {
      return true;
    }

    return false;
  }

  public canDisplayPossibilities(player: Player, card: Card, mode: string): boolean {
    if (mode !== 'play') {
      return false;
    }

    if (!this.canPlay) {
      return false;
    }

    return this.cardService.canDisplayPossibilities(player, card);
  }

  public previewCard(card: Card, player: Player): void {
    this.canPlay = this.playerService.previewCard(this.game, player, card);
    this.playerService.update(player, this.game);
  }

  public clearPreview(player: Player): void {
    this.canPlay = true;
    this.playerService.clearPreview(player);
    this.playerService.update(player, this.game);
  }

  public play(player: Player): void {
    this.playerService.play(player, this.game);

    if (!this.gameFlowService.canTrap(player)) {
      this.playerService.takeCards(player, this.game, environment.cardsCountPerPlayer - player.cards.length);
      this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
    } else {
      this.actionNavBar.changeToTrapMode();
    }

    // this.gameService.update(this.game);
  }

  public trap(player: Player): void {
    // launch trap

    // and finish
    this.playerService.takeCards(player, this.game, environment.cardsCountPerPlayer - player.cards.length);
    this.gameService.changeCurrentPlayer(player.nextPlayer, this.game);
    //this.gameService.update(this.game);
    this.actionNavBar.changeToPlayMode();
  }
}
