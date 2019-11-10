import {Component, Input} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {Obstacle} from '../../../@core/model/obstacle.model';

@Component({
  selector: '[appObstacle]',
  templateUrl: './obstacle.component.html',
})
export class ObstacleComponent {

  @Input()
  public obstacle: Obstacle;

  public get href(): string {
    return environment.svgServerUrl + encodeURIComponent(this.obstacle.src);
  }

  public get seaElementX(): number {
    return this.obstacle.x * environment.board.caseDimensions.width;
  }

  public get seaElementY(): number {
    return environment.board.caseDimensions.height *
      (this.obstacle.y -
        ((this.obstacle.coefHeight - 1) * this.obstacle.height)
      ) - 3;
  }

  public get seaElementWidth(): number {
    return this.obstacle.width * environment.board.caseDimensions.width;
  }

  public get seaElementHeight(): number {
    return this.obstacle.height *
      this.obstacle.coefHeight *
      environment.board.caseDimensions.width;
  }

  public get rectX(): number {
    return this.obstacle.x * environment.board.caseDimensions.width;
  }

  public get rectY(): number {
    return this.obstacle.y * environment.board.caseDimensions.height;
  }

  public get rectWidth(): number {
    return this.obstacle.width * environment.board.caseDimensions.width;
  }

  public get rectHeight(): number {
    return this.obstacle.height * environment.board.caseDimensions.height;
  }
}
