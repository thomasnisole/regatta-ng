import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Buoy} from '../model/buoy.model';
import {NgxTsSerializerService} from 'ngx-ts-serializer';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class BuoyService {

  public constructor(private dataService: DataService, private serializer: NgxTsSerializerService) {}

  public create(buoy: Buoy): Observable<string> {
    return this.dataService.add(`/games/${buoy.gameId}/buoys`, this.serializer.serialize(buoy));
  }
}
