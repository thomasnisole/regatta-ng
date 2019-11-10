import {Action, State, StateContext, Store} from '@ngxs/store';
import {SetCurrentUserUidAction} from './set-current-user-uid.action';
import {AuthService} from '../../../@system/service/auth.service';
import {switchMap} from 'rxjs/operators';

@State<string>({
  name: 'currentUserUid',
  defaults: null
})
export class CurrentUserUidState {

  public constructor(authService: AuthService, store: Store) {
    authService.getLoggedUserUid().pipe(
      switchMap((userUid: string) => store.dispatch(new SetCurrentUserUidAction(userUid)))
    ).subscribe();
  }

  @Action(SetCurrentUserUidAction)
  public setCurrentUser(ctx: StateContext<string>, action: SetCurrentUserUidAction): void {
    ctx.setState(action.userUid);
  }
}
