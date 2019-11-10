import { Injectable } from '@angular/core';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {from, Observable} from 'rxjs';
import {Player} from '../model/player.model';
import {Card} from '../model/card.model';
import {DataService} from '../../@system/service/data.service';
import {map, switchMap, toArray} from 'rxjs/operators';

@Injectable()
export class CardRepository {

  public constructor(private dataService: DataService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService) { }

  public findByPlayer(player: Player): Observable<Card[]> {
    return this.dataService.findAll(`/games/${player.gameId}/players/${player.id}/cards`).pipe(
      switchMap((datas: {id: string}[]) => from(datas).pipe(
        map((data: {id: string}) => this.deserializer.deserialize(Card, {gameId: player.gameId, playerId: player.id, ...data})),
        toArray()
      ))
    );
  }

  public takeCards(cardCount: number, player: Player): Observable<void> {
    return this.dataService.moveAll(
      `/games/${player.gameId}/cards`,
      `/games/${player.gameId}/players/${player.id}/cards`,
      [],
      cardCount
    );
  }

  public create(card: Card): Observable<string> {
    return this.dataService.add(`/games/${card.gameId}/cards`, this.serializer.serialize(card));
  }
}
