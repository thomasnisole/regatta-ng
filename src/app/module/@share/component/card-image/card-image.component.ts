import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../../@core/model/card.model';
import {environment} from '../../../../../environments/environment';
import {each} from 'lodash';

@Component({
  selector: '[appCardImage]',
  templateUrl: './card-image.component.html'
})
export class CardImageComponent implements OnInit {

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
    each(this.card.svgParams, (value, index) => {
      this.params += '&' + index + '=' + encodeURIComponent(value);
    });
  }

  public get href(): string {
    return environment.svgServerUrl + 'carte' + this.params;
  }
}
