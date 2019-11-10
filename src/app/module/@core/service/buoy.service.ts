import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Buoy} from '../model/buoy.model';
import {BuoyRepository} from '../repository/buoy.repository';
import {Memoize} from '../../@system/decorator/memoize.decorator';

@Injectable()
export class BuoyService {

  public constructor(private buoyRepository: BuoyRepository) {}

  @Memoize()
  public findByGameId(gameId: string): Observable<Buoy[]> {
    return this.buoyRepository.findByGameId(gameId);
  }
}
