import {Game} from '../../../@core/model/game.model';

export class SetCurrentGameAction {

  public static readonly type = '[CurrentGame] Set current game';

  public constructor(public game: Game) {}
}
