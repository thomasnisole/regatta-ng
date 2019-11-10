import {Action, State, StateContext, Store} from '@ngxs/store';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {defaultIfEmpty, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {SetCurrentGameIdAction} from './set-current-game-id.action';

@State<string>({
  name: 'currentGameId',
  defaults: null
})
export class CurrentGameIdState {

  public constructor(router: Router, activatedRoute: ActivatedRoute, store: Store) {
    router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      map(() => activatedRoute),
      map((route: ActivatedRoute) => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      }),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
      map((route: ActivatedRoute) => route.snapshot.params[`gameId`]),
      map((gameId: string) => gameId ? gameId : null),
      distinctUntilChanged()
    ).subscribe(
      (gameId: string) => {
        store.dispatch(new SetCurrentGameIdAction(gameId));
      }
    );
  }

  @Action(SetCurrentGameIdAction)
  public setCurrentGameId(ctx: StateContext<string>, action: SetCurrentGameIdAction): void {
    ctx.setState(action.gameId);
  }
}
