import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../share/model/card';
import * as _ from 'underscore/underscore';
import {Player} from '../../share/model/player';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../../share/model/game';

@Component({
  selector: 'app-card-to-play',
  templateUrl: './card-to-play.component.html',
  styleUrls: ['./card-to-play.component.scss']
})
export class CardToPlayComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public canDisplayPossibilities: boolean;

  @Input()
  public isInTrashMode: boolean;

  @Input()
  public isInTrapMode: boolean;

  @Input()
  public game: Game;

  @Output()
  public clickOnPossibility: EventEmitter<Card> = new EventEmitter<Card>();

  public constructor(private modalService: NgbModal) {}

  public ngOnInit(): void { }

  public isPossibilitySelectable(index: number): boolean {
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

  public openTrapPlayer(content, card: Card): void {
    if (!card.isTrapCard()) {
      return;
    }

    this.modalService.open(content).result.then((p: Player) => {
      if (!p && card.playerTrap) {
        this.game.getPlayerByUserId(card.playerTrap).isTrap = false;
        card.playerTrap = void 0;
      } else {
        card.playerTrap = p.userId;
        p.isTrap = true;
      }
    });
  }
}
