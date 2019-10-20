import {Component} from '@angular/core';
import {AuthService} from '../../../@system/service/auth.service';
import {Router} from '@angular/router';
import {first, mergeMap, tap} from 'rxjs/operators';
import {LoggedUserInformation} from '../../../@system/model/logged-user-information.model';
import {UserService} from '../../../@core/service/user.service';
import {of} from 'rxjs';
import {User} from '../../../@core/model/user.model';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public constructor(authService: AuthService,
                     userService: UserService,
                     store: Store,
                     router: Router) {
    authService.getLoggedUserUid().pipe(
      first(),
      mergeMap((uid: string) => !!uid ? userService.findByUid(uid) : authService.authenticateWithGoogle().pipe(
        mergeMap((credential: LoggedUserInformation) => userService.findByUid(credential.uid).pipe(
          mergeMap((user: User) => !!user ? of(user) : userService.create(new User(credential)))
        ))
      ))
    ).subscribe(() => router.navigate(['/', 'player', 'home']));
  }
}
