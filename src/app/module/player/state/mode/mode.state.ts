import {Action, State, StateContext} from '@ngxs/store';
import {ChangeModeAction} from './change-mode.action';

@State<'play'|'trap'|'trash'>({
  name: 'modeState',
  defaults: 'play'
})
export class ModeState {

  @Action(ChangeModeAction)
  public changeMode(ctx: StateContext<'play'|'trap'|'trash'>, action: ChangeModeAction): void {
    ctx.setState(action.mode);
  }
}
