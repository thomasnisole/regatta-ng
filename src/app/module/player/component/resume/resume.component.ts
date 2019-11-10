import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../../../@core/model/game.model';
import {GameService} from '../../../@core/service/game.service';
import {User} from '../../../@core/model/user.model';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../../../@core/service/user.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html'
})
export class ResumeComponent implements OnInit {

  public games$: Observable<Game[]>;

  public constructor(private userService: UserService, private gameService: GameService) { }

  public ngOnInit(): void {
    this.games$ = this.userService.findUserAccount().pipe(
      switchMap((user: User) => this.gameService.findAllResuming(user))
    );
  }
}
