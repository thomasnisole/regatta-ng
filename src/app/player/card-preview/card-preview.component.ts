import {Component, Input, OnInit} from '@angular/core';
import * as _ from 'underscore/underscore';
import {environment} from '../../../environments/environment';
import { AbstractCard } from '../../share/model/abstract-card';
import { CloudCard } from '../../share/model/cloud-card';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit {

  @Input()
  public cards: AbstractCard[];

  public constructor() { }

  public ngOnInit(): void {

  }

  public get cardsToDisplay(): AbstractCard[] {
    return _.sortBy(_.filter(this.cards, (c: AbstractCard) => c.previewPossibilities), 'previewOrder');
  }

  public getHref(card: AbstractCard): string {
    let params = '';
    _.each(card.svgParams, (value, index) => {
      params += '&' + index + '=' + encodeURIComponent(value);
    });

    return environment.svgServerUrl + 'carte' + params;
  }

  public cardIsCloud(card: AbstractCard): boolean {
    return card instanceof CloudCard;
  }
}
