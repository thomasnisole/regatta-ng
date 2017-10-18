import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../share/model/card';
import * as _ from 'underscore/underscore';

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

  @Output()
  public clickOnPossibility: EventEmitter<Card> = new EventEmitter<Card>();

  public constructor() {}

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
}