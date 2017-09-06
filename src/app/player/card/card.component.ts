import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../share/model/card';
import * as _ from 'underscore/underscore';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public canDisplayPossibilities: boolean;

  @Input()
  public isInTrashMode: boolean;

  private params: string;

  public constructor() { }

  public ngOnInit(): void {
    this.params = '';
    _.each(this.card.svgParams, (value, index) => {
      this.params += '&' + index + '=' + encodeURIComponent(value);
    });
  }

  public get href(): string {
    return environment.svgServerUrl + 'carte' + this.params;
  }

  public isPossibilitySelectable(index: number): boolean {
    return _.indexOf(Object.keys(this.card.possibilities), String(index)) !== -1;
  }
}
