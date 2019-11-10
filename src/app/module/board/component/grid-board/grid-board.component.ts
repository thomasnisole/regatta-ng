import {Component, Input} from '@angular/core';

@Component({
  selector: '[appGridBoard]',
  templateUrl: './grid-board.component.html',
})
export class GridBoardComponent {

  @Input()
  public gridX: number;

  @Input()
  public gridY: number;
}
