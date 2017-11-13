import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore/underscore';
import { AbstractCard } from '../../share/model/abstract-card';
import { Game } from '../../share/model/game';
import {Player} from '../../share/model/player';

@Component({
  selector: 'app-card-to-play',
  templateUrl: './card-to-play.component.html',
  styleUrls: ['./card-to-play.component.scss']
})
export class CardToPlayComponent implements OnInit {

  @Input()
  public card: AbstractCard;

  @Input()
  public canDisplayPossibilities: boolean;

  @Input()
  public isInTrashMode: boolean;

  @Input()
  public isInTrapMode: boolean;

  @Input()
  public game: Game;

  @Output()
  public clickOnPossibility: EventEmitter<AbstractCard> = new EventEmitter<AbstractCard>();

  public constructor(private modalService: NgbModal) {}

  public ngOnInit(): void { }

  public isPossibilitySelectable(index: number): boolean {
    if (!this.card.possibilities) {
      return false;
    }

    return _.indexOf(Object.keys(this.card.possibilities), String(index)) !== -1;
  }

  public onClickOnPossibility(possibility: number) {
    if (!this.isPossibilitySelectable(possibility)) {
      return;
    }

    if (!this.card.previewPossibilities) {
      this.card.previewPossibilities = [];
    }

    this.card.previewPossibilities.push(possibility);

    this.clickOnPossibility.emit(this.card);
  }

  public openTrapPlayer(content, card: AbstractCard): void {
    if (!card.isTrapCard()) {
      return;
    }

    this.modalService.open(content).result.then((p: Player) => {
      if (!p && card.playerTrap) {
        this.game.getPlayerByUserId(card.playerTrap).isTrapped = false;
        card.playerTrap = void 0;
      } else {
        card.playerTrap = p.userId;
        p.isTrapped = true;
      }
    });
  }
}
