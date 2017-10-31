import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  public constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  public authenticateWithGoogle(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
