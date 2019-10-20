import {Injectable} from '@angular/core';
import {Game} from '../model/game.model';
import {from, Observable} from 'rxjs';
import {Player} from '../model/player.model';
import {NgxTsDeserializerService, NgxTsSerializerService} from 'ngx-ts-serializer';
import {Boat} from '../model/boat.model';
import {first, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {User} from '../model/user.model';
import {GameService} from './game.service';
import {PlayerStatus} from '../model/player-status.enum';
import {CardService} from './card.service';
import {DataService} from '../../@system/service/data.service';

@Injectable()
export class PlayerService {

  public constructor(private dataService: DataService,
                     private gameService: GameService,
                     private serializer: NgxTsSerializerService,
                     private deserializer: NgxTsDeserializerService,
                     private cardService: CardService) { }

  public findByGameId(gameId: string): Observable<Player[]> {
    return this.dataService.findAll(`/games/${gameId}/players`).pipe(
      mergeMap((datas: {id: string}[]) => from(datas).pipe(
        map((data: {id: string}) => this.deserializer.deserialize(Player, data)),
        toArray()
      ))
    );
  }

  public findByGameIdAndUserUid(gameId: string, userUid: string): Observable<Player> {
    return this.dataService.findOne(`/games/${gameId}/players/${userUid}`).pipe(
      map((data: {id: string}) => this.deserializer.deserialize(Player, data))
    );
  }

  public addPlayerToGame(game: Game, user: User, color, boatNumber): Observable<void> {
    const boat: Boat = new Boat();
    boat.boatNumber = boatNumber;
    boat.color = color;
    boat.orientation = game.board.boatOrientation;
    boat.x = 0;
    boat.y = 0;
    boat.width = 0;
    boat.height = 0;

    const player: Player = new Player();
    player.name = user.displayName;
    player.userUid = user.uid;
    player.gameId = game.id;
    player.status = PlayerStatus.WAITING_TO_START;
    player.boat = boat;

    game.userUids.push(user.uid);

    return this.create(player).pipe(
      tap((playerId: string) => player.id = playerId),
      mergeMap(() => this.gameService.update(game)),
      mergeMap(() => this.cardService.takeCards(5, player)),
      first()
    );
  }

  public deletePlayerFromGame(player: Player): Observable<void> {
    // from(this.db.collection(''));

    return null;
  }

  public create(player: Player): Observable<string> {
    return this.dataService.createOne(`/games/${player.gameId}/players/${player.userUid}`, this.serializer.serialize(player)).pipe(
      map(() => player.userUid)
    );
  }
}
