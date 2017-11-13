import { Component, Input, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Game} from '../../share/model/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  private _games: Observable<Game[]>;

  @Input()
  public noMessage: string;

  @Input()
  public routeSuffix: string;

  public constructor() { }

  public ngOnInit(): void { }

  @Input()
  public set games(values: Observable<Game[]>) {
    if (!values) {
      return;
    }

    this._games = values.share();
  }

  public get games(): Observable<Game[]> {
    return this._games;
  }
}
