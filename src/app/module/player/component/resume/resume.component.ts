import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {GameService} from '../../../@core/service/game.service';
import {CurrentUserState} from '../../state/current-user/current-user.state';
import {User} from '../../../@core/model/user.model';
import {Select} from '@ngxs/store';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html'
})
export class ResumeComponent implements OnInit {

  @Select(CurrentUserState)
  public user$: Observable<User>;

  public games$: Observable<Game[]>;

  public constructor(private gameService: GameService) { }

  public ngOnInit(): void {
    this.games$ = this.user$.pipe(
      mergeMap((user: User) => this.gameService.findAllResuming(user))
    );
  }
}
