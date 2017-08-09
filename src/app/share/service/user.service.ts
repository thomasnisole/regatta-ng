import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import 'rxjs/add/observable/of';
import {deserialize, serialize} from 'json-typescript-mapper';
import {AuthService} from './auth.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UserService {

  private user: User;

  public constructor(private authService: AuthService, private db: AngularFireDatabase) { }

  public findUserAccount(): Observable<User> {
    if (this.user) {
      return Observable.of(this.user);
    }

    return Observable.create(observer => {
      this.authService.user.subscribe((user) => {
        if (!user) {
          this.authService.authenticateWithGoogle();
        }

        this.user = deserialize(User, user);

        this.db.object('/users/' + user.uid).update(serialize(this.user));

        this.user.id = user.uid;

        observer.next(this.user);
      });
    });
  }
}
