import {Action, State, StateContext} from '@ngxs/store';
import {SetCurrentGameAction} from './set-current-game.action';
import {Game} from '../../../@core/model/game.model';

@State<Game>({
  name: 'currentGame',
  defaults: null
})
export class CurrentGameState {

  @Action(SetCurrentGameAction)
  public setCurrentUser(ctx: StateContext<Game>, action: SetCurrentGameAction): void {
    ctx.setState(action.game);
  }
}
