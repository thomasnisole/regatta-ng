import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Player} from '../model/player.model';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {map, switchMap, toArray} from 'rxjs/operators';
import {DataService} from '../../@system/service/data.service';
import {cloneDeep} from 'lodash';

@Injectable()
export class PlayerRepository {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService) { }

  public findByGameId(gameId: string): Observable<Player[]> {
    return this.dataService.findAll(`/games/${gameId}/players`).pipe(
      switchMap((datas: {id: string}[]) => from(datas).pipe(
        map((data: {id: string}) => this.deserializer.deserialize(Player, {gameId, ...data})),
        toArray()
      ))
    );
  }

  public findByGameIdAndUserUid(gameId: string, userUid: string): Observable<Player> {
    return this.dataService.findOne(`/games/${gameId}/players/${userUid}`).pipe(
      map((data: {id: string}) => this.deserializer.deserialize(Player, {gameId, ...data}))
    );
  }

  public deletePlayerFromGame(player: Player): Observable<void> {
    // from(this.db.collection(''));

    return null;
  }

  public create(player: Player): Observable<string> {
    return this.dataService.createOne(`/games/${player.gameId}/players/${player.id}`, this.serializer.serialize(player)).pipe(
      map(() => player.userUid)
    );
  }

  public update(player: Player): Observable<void> {
    return this.dataService.update(`/games/${player.gameId}/players/${player.userUid}`, this.serializer.serialize(player));
  }
}
