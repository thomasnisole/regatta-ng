import {Action, State, StateContext} from '@ngxs/store';
import {User} from '../../../@core/model/user.model';
import {SetCurrentUserAction} from './set-current-user.action';

@State<User>({
  name: 'currentUser',
  defaults: null
})
export class CurrentUserState {

  @Action(SetCurrentUserAction)
  public setCurrentUser(ctx: StateContext<User>, action: SetCurrentUserAction): void {
    ctx.setState(action.user);
  }
}
