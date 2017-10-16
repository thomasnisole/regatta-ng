import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../share/model/card';
import * as _ from 'underscore/underscore';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  @Input()
  public cards: Card[];

  public constructor() { }

  public ngOnInit(): void {

  }

  public get cardsToDisplay(): Card[] {
    return _.sortBy(_.filter(this.cards, (c: Card) => c.previewPossibilities), 'previewOrder');
  }

  public getHref(card: Card): string {
    let params = '';
    _.each(card.svgParams, (value, index) => {
      params += '&' + index + '=' + encodeURIComponent(value);
    });

    return environment.svgServerUrl + 'carte' + params;
  }
}
