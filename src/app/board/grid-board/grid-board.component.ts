import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[appGridBoard]',
  templateUrl: './grid-board.component.html',
  styleUrls: ['./grid-board.component.scss']
})
export class GridBoardComponent implements OnInit {

  @Input()
  public gridX: number;

  @Input()
  public gridY: number;

  public constructor() { }

  public ngOnInit(): void {

  }
}
