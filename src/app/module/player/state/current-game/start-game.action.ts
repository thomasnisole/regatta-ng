import {Game} from '../../../@core/model/game.model';

export class StartGameAction {

  public static readonly type = '[StartGame] Start game';

  public constructor(public game: Game) {}
}
