import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {CheckLine} from '../model/check-line.model';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {DataService} from '../../@system/service/data.service';
import {Player} from '../model/player.model';
import {map, switchMap, toArray} from 'rxjs/operators';
import {Game} from '../model/game.model';

@Injectable()
export class CheckLineRepository {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService) {}

  public findByPlayer(player: Player): Observable<CheckLine[]> {
    if (!player.gameId) {
      throw new Error('Player has no game id');
    }

    return this.dataService.findAll(`/games/${player.gameId}/players/${player.id}/check-lines`).pipe(
      switchMap((datas: {id: string}[]) => from(datas).pipe(
        map((data: {id: string}) => this.deserializer.deserialize(CheckLine, {gameId: player.gameId, playerId: player.id, ...data})),
        toArray()
      ))
    );
  }

  public findByGame(game: Game): Observable<CheckLine[]> {
    return this.dataService.findAll(`/games/${game.id}/check-lines`).pipe(
      switchMap((datas: {id: string}[]) => from(datas).pipe(
        map((data: {id: string}) => this.deserializer.deserialize(CheckLine, {gameId: game.id, ...data})),
        toArray()
      ))
    );
  }

  public createInPlayer(checkLine: CheckLine): Observable<string> {
    return this.dataService.add(`/games/${checkLine.gameId}/players/${checkLine.playerId}/check-lines`, this.serializer.serialize(checkLine));
  }

  public createInGame(checkLine: CheckLine): Observable<string> {
    return this.dataService.add(`/games/${checkLine.gameId}/check-lines`, this.serializer.serialize(checkLine));
  }
}
