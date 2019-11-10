import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {NgxTsDeserializerService} from 'ngx-ts-serializer';
import {first, map} from 'rxjs/operators';
import {Level} from '../model/level.model';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class LevelRepository {

  public constructor(private dataService: DataService,
                     private deserializer: NgxTsDeserializerService) {}

  public findById(id: string): Observable<Level> {
    return this.dataService.findOne(`/levels/${id}`).pipe(
      first(),
      map((data: {id: string}) => this.deserializer.deserialize(Level, data))
    );
  }
}
