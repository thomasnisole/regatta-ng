import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {from, Observable} from 'rxjs';
import {AuthService} from '../../@system/service/auth.service';
import {catchError, map} from 'rxjs/operators';
import {Store} from '@ngxs/store';

@Injectable()
export class UserGuard implements CanActivate {

  public constructor(private authService: AuthService,
                     private router: Router,
                     private store: Store) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getLoggedUserUid().pipe(
      catchError(() => from(this.router.navigate(['/', 'player', 'login'])).pipe(
        map(() => false))
      ),
      map((userUid: string) => !!userUid)
    );
  }
}
