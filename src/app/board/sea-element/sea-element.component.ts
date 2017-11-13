import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {SeaElement} from '../../share/model/sea-element';

@Component({
  selector: '[appSeaElement]',
  templateUrl: './sea-element.component.html',
  styleUrls: ['./sea-element.component.scss']
})
export class SeaElementComponent implements OnInit {

  @Input()
  public seaElement: SeaElement;

  public constructor() { }

  public ngOnInit(): void {

  }

  public get href(): string {
    return environment.svgServerUrl + encodeURIComponent(this.seaElement.src);
  }

  public get seaElementX(): number {
    return this.seaElement.x * environment.board.caseDimensions.width;
  }

  public get seaElementY(): number {
    return environment.board.caseDimensions.height *
      (this.seaElement.y -
        ((this.seaElement.heightCoefficient - 1) * this.seaElement.height)
      ) - 3;
  }

  public get seaElementWidth(): number {
    return this.seaElement.width * environment.board.caseDimensions.width;
  }

  public get seaElementHeight(): number {
    return this.seaElement.height *
      this.seaElement.heightCoefficient *
      environment.board.caseDimensions.width;
  }

  public get rectX(): number {
    return this.seaElement.x * environment.board.caseDimensions.width;
  }

  public get rectY(): number {
    return this.seaElement.y * environment.board.caseDimensions.height;
  }

  public get rectWidth(): number {
    return this.seaElement.width * environment.board.caseDimensions.width;
  }

  public get rectHeight(): number {
    return this.seaElement.height * environment.board.caseDimensions.height;
  }
}
