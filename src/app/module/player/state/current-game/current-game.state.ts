import {Action, State, StateContext} from '@ngxs/store';
import {SetCurrentGameAction} from './set-current-game.action';
import {Game} from '../../../@core/model/game.model';
import {StartGameAction} from './start-game.action';

@State<Game>({
  name: 'currentGame',
  defaults: null
})
export class CurrentGameState {

  @Action(SetCurrentGameAction)
  public setCurrentUser(ctx: StateContext<Game>, action: SetCurrentGameAction): void {
    ctx.setState(action.game);
  }

  @Action(StartGameAction)
  public startGame(ctx: StateContext<Game>, action: StartGameAction): void {

  }
}
