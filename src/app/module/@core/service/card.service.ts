import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@angular/fire/firestore';
import {NgxTsSerializerService} from 'ngx-ts-serializer';
import {from, Observable} from 'rxjs';
import {first, map, mergeMap, toArray} from 'rxjs/operators';
import {Player} from '../model/player.model';
import {Card} from '../model/card.model';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class CardService {

  public constructor(private db: AngularFirestore,
                     private dataService: DataService,
                     private serializer: NgxTsSerializerService) { }

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

  public trashCard(card: Card): Observable<void> {
    return null;
  }
}
