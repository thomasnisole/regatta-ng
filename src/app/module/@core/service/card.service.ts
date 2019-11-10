import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '../model/player.model';
import {Card} from '../model/card.model';
import {CardRepository} from '../repository/card.repository';
import {Memoize} from '../../@system/decorator/memoize.decorator';

@Injectable()
export class CardService {

  public constructor(private cardRepository: CardRepository) { }

  @Memoize()
  public findByPlayer(player: Player): Observable<Card[]> {
    return this.cardRepository.findByPlayer(player);
  }

  public takeCards(cardCount: number, player: Player): Observable<void> {
    return this.cardRepository.takeCards(cardCount, player);
  }

  public trashCard(card: Card): Observable<void> {
    return null;
  }
}
