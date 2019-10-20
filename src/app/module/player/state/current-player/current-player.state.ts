import {Action, State, StateContext} from '@ngxs/store';
import {SetCurrentPlayerAction} from './set-current-player.action';
import {Player} from '../../../@core/model/player.model';

@State<Player>({
  name: 'currentPlayer',
  defaults: null
})
export class CurrentPlayerState {

  @Action(SetCurrentPlayerAction)
  public setCurrentUser(ctx: StateContext<Player>, action: SetCurrentPlayerAction): void {
    ctx.setState(action.player);
  }
}
