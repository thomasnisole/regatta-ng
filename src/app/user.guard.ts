import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './share/service/auth.service';

@Injectable()
export class UserGuard implements CanActivate {

  public constructor(private authService: AuthService, private router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(observer => this.authService.user.subscribe((user) => {
      if (!user) {
        this.authService
          .authenticateWithGoogle()
          .then(
            (data) => observer.next(true),
            (error) => {
              observer.next(false);

              this.router.navigate(['/']);
            }
          );
      } else {
        observer.next(true);
      }
    }));
  }
}
