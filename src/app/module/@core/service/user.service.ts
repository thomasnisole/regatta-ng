import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {UserRepository} from '../repository/user.repository';
import {Cacheable} from 'ngx-cacheable';
import {hotShareReplay} from '../../@system/rx-operator/hot-share-replay.operator';
import {CurrentUserUidState} from '../../player/state/current-user-uid/current-user-uid.state';
import {Select} from '@ngxs/store';
import {Memoize} from '../../@system/decorator/memoize.decorator';

@Injectable()
export class UserService {

  @Select(CurrentUserUidState)
  private userUid$: Observable<string>;

  public constructor(private userRepository: UserRepository) {}

  @Memoize()
  public findUserAccount(): Observable<User> {
    return this.userUid$.pipe(
      switchMap((uid: string) => this.userRepository.findByUid(uid)),
      hotShareReplay(1)
    );
  }

  public findByUid(uid: string): Observable<User> {
    return this.userRepository.findByUid(uid);
  }

  public create(user: User): Observable<User> {
    user.partyCount   = 0;
    user.podiumCount  = 0;
    user.victoryCount = 0;

    return this.userRepository.create(user);
  }
}
