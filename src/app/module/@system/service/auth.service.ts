import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {hotShareReplay} from '../rx-operator/hot-share-replay.operator';
import {NgxTsDeserializerService} from 'ngx-ts-serializer';
import {LoggedUserInformation} from '../model/logged-user-information.model';
import {Cacheable} from 'ngx-cacheable';
import {Memoize} from '../decorator/memoize.decorator';

@Injectable()
export class AuthService {

  public constructor(private afAuth: AngularFireAuth, private deserializer: NgxTsDeserializerService) {}

  @Memoize()
  public getLoggedUserUid(): Observable<string|null> {
    return this.afAuth.user.pipe(
      map((user: firebase.User) => user ? user.uid : null),
      hotShareReplay(1)
    );
  }

  public authenticateWithGoogle(): Observable<any> {
    return from(this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
      map((credentials: firebase.auth.UserCredential) => this.deserializer.deserialize(LoggedUserInformation, {
        uid: credentials.user.uid,
        firstName: credentials.additionalUserInfo.profile[`given_name`],
        lastName: credentials.additionalUserInfo.profile[`family_name`],
        email: credentials.user.email,
        avatar: credentials.user.photoURL
      }))
    );
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
