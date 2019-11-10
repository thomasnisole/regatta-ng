import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {Observable} from 'rxjs';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {map} from 'rxjs/operators';
import {GameStatus} from '../model/game-status.enum';
import {User} from '../model/user.model';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class GameRepository {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService) {}

  public findById(id: string): Observable<Game> {
    return this.dataService.findOne(`/games/${id}`).pipe(
      map((data: {id: string}) => this.deserializer.deserialize(Game, data))
    );
  }

  public findByStatus(status: GameStatus): Observable<Game[]> {
    return this.dataService.findAll('/games', [{field: 'status', operator: '==', value: status}]).pipe(
      map((datas: {id: string}[]) => this.deserializer.deserialize(Game, datas))
    );
  }

  public findByUserUidIn(user: User): Observable<Game[]> {
    return this.dataService.findAll(
      '/games',
      [{field: 'userUids', operator: 'array-contains', value: user.uid}]
    ).pipe(
      map((datas: {id: string}[]) => this.deserializer.deserialize(Game, datas))
    );
  }

  public create(game: Game): Observable<string> {
    return this.dataService.add('/games', this.serializer.serialize(game));
  }

  public update(game: Game): Observable<void> {
    return this.dataService.update(`/games/${game.id}`, this.serializer.serialize(game));
  }
}
