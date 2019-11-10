export class ChangeModeAction {

  public static readonly type: string = '[ChangeModeAction] Change mode';

  public constructor(public mode: 'play'|'trap'|'trash') {}
}
