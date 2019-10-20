import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NgxTsSerializerService} from 'ngx-ts-serializer';
import {Obstacle} from '../model/obstacle.model';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class ObstacleService {

  public constructor(private dataService: DataService, private serializer: NgxTsSerializerService) {}

  public create(obstacle: Obstacle): Observable<string> {
    return this.dataService.add(`/games/${obstacle.gameId}/obstacles`, this.serializer.serialize(obstacle));
  }
}
