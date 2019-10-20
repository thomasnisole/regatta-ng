import {Component, Input} from '@angular/core';
import {Game} from '../../../@core/model/game.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {

  @Input()
  public games$: Observable<Game[]>;

  @Input()
  public noMessage: string;

  @Input()
  public routeSuffix: string;
}
