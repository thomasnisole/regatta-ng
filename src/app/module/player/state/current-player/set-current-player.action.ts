import {Player} from '../../../@core/model/player.model';

export class SetCurrentPlayerAction {

  public static readonly type = '[CurrentPlayer] Set current player';

  public constructor(public player: Player) {}
}
