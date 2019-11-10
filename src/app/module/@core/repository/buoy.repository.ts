import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Buoy} from '../model/buoy.model';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {DataService} from '../../@system/service/data.service';
import {map} from 'rxjs/operators';

@Injectable()
export class BuoyRepository {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService) {}

  public findByGameId(gameId: string): Observable<Buoy[]> {
    return this.dataService.findAll(`/games/${gameId}/buoys`).pipe(
      map((datas: {id: string}[]) => this.deserializer.deserialize(Buoy, datas))
    );
  }

  public create(buoy: Buoy): Observable<string> {
    if (!buoy.gameId) {
      throw new Error('Buoy has not game id');
    }

    return this.dataService.add(`/games/${buoy.gameId}/buoys`, this.serializer.serialize(buoy));
  }
}
