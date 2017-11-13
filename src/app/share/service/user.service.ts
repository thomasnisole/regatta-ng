import * as _ from 'underscore/underscore';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {deserialize, serialize} from 'json-typescript-mapper';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user';
import {removeUndefined} from '../utils';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

  private user: Observable<User>;

  private firstUpdate: boolean = false;

  public constructor(private authService: AuthService, private db: AngularFireDatabase) { }

  public findUserAccount(): Observable<User> {
    if (this.user) {
      return this.user;
    }

    this.user = Observable.create(observer => this.authService.user.subscribe((user) => {
        if (!user) {
          this.authService.authenticateWithGoogle()
            .then((userInformations) => this.makeUser(userInformations).subscribe((u: User) => observer.next(u)));
        } else {
          this.makeUser(user).subscribe((u: User) => observer.next(u));
        }
      })
    );

    return this.user;
  }

  private makeUser(userInformation: any): Observable<User> {
    return this.findById(userInformation.providerData[0].uid)
      .do((user: User) => {
        if (this.firstUpdate) {
          return;
        }

        const infos = userInformation.providerData[0];
        user.username = infos.email;
        user.displayName = infos.displayName;
        user.photoURL = infos.photoURL;

        this.db.object('/users/' + userInformation.providerData[0].uid).set(removeUndefined(serialize(user)));
        this.firstUpdate = true;
      })
      .catch((err: Error) => {
        const user: User = deserialize(User, userInformation.providerData[0]);
        user.partyCount = 0;
        user.podiumCount = 0;
        user.victoryCount = 0;
        this.db.object('/users/' + userInformation.providerData[0].uid).set(removeUndefined(serialize(user)));

        user.id = userInformation.providerData[0].uid;

        return this.user;
      });
  }

  public findById(id: string): Observable<User> {
    return this.db
      .object('/users/' + id)
      .snapshotChanges()
      .do((os: any) => {
        if (!os.key) {
          throw Error('No user found');
        }
      })
      .map((os: any) => {
        const u: User = deserialize(User, os.payload.val());
        u.id = os.payload.key;

        return u;
      });
  }
}
