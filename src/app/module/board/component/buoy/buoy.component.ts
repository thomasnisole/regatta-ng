import {Component, Input, OnInit} from '@angular/core';
import {Buoy} from '../../../@core/model/buoy.model';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: '[appBuoy]',
  templateUrl: './buoy.component.html',
})
export class BuoyComponent {

  @Input()
  public buoy: Buoy;

  public get href(): string {
    return environment.svgServerUrl + 'buoy&buoy-color=' + encodeURIComponent(this.buoy.color);
  }

  public get buoyX(): number {
    return (this.buoy.x * environment.board.caseDimensions.width) - (environment.board.caseDimensions.width * 0.125);
  }

  public get buoyY(): number {
    return (this.buoy.y * environment.board.caseDimensions.height) - (environment.board.caseDimensions.height * 1.32);
  }

  public get buoyWidth(): number {
    return 1.25 * environment.board.caseDimensions.width;
  }

  public get buoyHeight(): number {
    return 2.50 * environment.board.caseDimensions.height;
  }
}
