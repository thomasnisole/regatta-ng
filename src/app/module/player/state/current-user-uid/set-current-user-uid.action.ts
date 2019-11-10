export class SetCurrentUserUidAction {

  public static readonly type = '[CurrentUserUid] Set current user uid';

  public constructor(public userUid: string) {}
}
