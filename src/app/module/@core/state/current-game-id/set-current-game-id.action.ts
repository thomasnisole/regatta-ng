export class SetCurrentGameIdAction {

  public static readonly type = '[CurrentGameId] Set current game id';

  public constructor(public gameId: string) {}
}
