import {User} from '../../../@core/model/user.model';

export class SetCurrentUserAction {

  public static readonly type = '[CurrentUser] Set current user';

  public constructor(public user: User) {}
}
