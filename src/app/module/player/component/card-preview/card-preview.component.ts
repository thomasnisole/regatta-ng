import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../../@core/model/card.model';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  @Input()
  public cards: Card[];

  @Output()
  public clickOnParameters: EventEmitter<any> = new EventEmitter<any>();

  public constructor() { }

  public ngOnInit(): void {

  }

  public get cardsToDisplay(): Card[] {
    return [];
    // return _.sortBy(_.filter(this.cards, (c: AbstractCard) => c.previewPossibilities), 'previewOrder');
  }

  public getHref(card: Card): string {
    /*let params = '';
    _.each(card.svgParams, (value, index) => {
      params += '&' + index + '=' + encodeURIComponent(value);
    });

    return environment.svgServerUrl + 'carte' + params;*/
    return '';
  }
}
