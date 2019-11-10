import {Injectable} from '@angular/core';
import {ObstacleRepository} from '../repository/obstacle.repository';
import {Observable} from 'rxjs';
import {Obstacle} from '../model/obstacle.model';
import {Memoize} from '../../@system/decorator/memoize.decorator';
import {hotShareReplay} from '../../@system/rx-operator/hot-share-replay.operator';

@Injectable()
export class ObstacleService {

  public constructor(private obstacleRepository: ObstacleRepository) {}

  @Memoize()
  public findByGameId(gameId: string): Observable<Obstacle[]> {
    return this.obstacleRepository.findByGameId(gameId).pipe(
      hotShareReplay(1)
    );
  }
}
