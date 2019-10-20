import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CheckLine} from '../model/check-line.model';
import {NgxTsSerializerService} from 'ngx-ts-serializer';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class CheckLineService {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService) {}

  public create(checkLine: CheckLine): Observable<string> {
    return this.dataService.add(`/games/${checkLine.gameId}/check-lines`, this.serializer.serialize(checkLine));
  }
}
