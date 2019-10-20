import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../@system/service/auth.service';
import {first, map, mergeMap, tap} from 'rxjs/operators';
import {UserService} from '../../@core/service/user.service';
import {User} from '../../@core/model/user.model';
import {Store} from '@ngxs/store';
import {SetCurrentUserAction} from '../state/current-user/set-current-user.action';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {

  public constructor(private authService: AuthService,
                     private userService: UserService,
                     private router: Router,
                     private store: Store) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getLoggedUserUid().pipe(
      tap((uid: string) => !uid ? this.router.navigate(['/', 'player', 'login']) : void 0),
      mergeMap((uid: string) => this.userService.findByUid(uid)),
      mergeMap((user: User) => this.store.dispatch(new SetCurrentUserAction(user))),
      map((user: User) => !!user),
      first()
    );
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
