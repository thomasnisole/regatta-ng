import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {Obstacle} from '../model/obstacle.model';
import {DataService} from '../../@system/service/data.service';
import {map} from 'rxjs/operators';

@Injectable()
export class ObstacleRepository {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService) {}

  public findByGameId(gameId: string): Observable<Obstacle[]> {
    return this.dataService.findAll(`/games/${gameId}/obstacles`).pipe(
      map((datas: {id: string}[]) => this.deserializer.deserialize(Obstacle, datas))
    );
  }

  public create(obstacle: Obstacle): Observable<string> {
    if (!obstacle.gameId) {
      throw new Error('Obstacle has no game id');
    }

    return this.dataService.add(`/games/${obstacle.gameId}/obstacles`, this.serializer.serialize(obstacle));
  }
}
