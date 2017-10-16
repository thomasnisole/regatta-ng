import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../model/card';
import {environment} from '../../../environments/environment';
import * as _ from 'underscore/underscore';

@Component({
  selector: '[appCard]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public card: Card;

  @Input()
  public x: number;

  @Input()
  public y: number;

  @Input()
  public width: number;

  @Input()
  public height: number;

  @Input()
  public activeRotation: any = false;

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
}
