import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CheckLine} from '../model/check-line.model';
import {Player} from '../model/player.model';
import {Game} from '../model/game.model';
import {CheckLineRepository} from '../repository/check-line.repository';

@Injectable()
export class CheckLineService {

  public constructor(private checkLineRepository: CheckLineRepository) {}

  public findByPlayer(player: Player): Observable<CheckLine[]> {
    return this.checkLineRepository.findByPlayer(player);
  }

  public findByGame(game: Game): Observable<CheckLine[]> {
    return this.checkLineRepository.findByGame(game);
  }
}
