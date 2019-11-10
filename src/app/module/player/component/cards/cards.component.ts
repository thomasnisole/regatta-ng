import {Component, Input} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {Player} from '../../../@core/model/player.model';
import {CardService} from '../../../@core/service/card.service';
import {Observable} from 'rxjs';
import {Card} from '../../../@core/model/card.model';
import {PlayerService} from '../../../@core/service/player.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  public cards$: Observable<Card[]>;

  @Input()
  public disabled: boolean;

  public constructor(private playerService: PlayerService, private cardService: CardService) {
    this.cards$ = this.playerService.findCurrentPayer().pipe(
      switchMap((player: Player) => this.cardService.findByPlayer(player))
    );
  }

  public onIndexChange(event): void {
    console.log(event);
  }
}
