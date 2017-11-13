import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Game } from '../../share/model/game';
import { User } from '../../share/model/user';
import { GameService } from '../../share/service/game.service';
import { UserService } from '../../share/service/user.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  public games: Observable<Game[]>;

  public constructor(private userService: UserService, private gameService: GameService) { }

  public ngOnInit(): void {
    this.userService.findUserAccount().subscribe(
      (user: User) => this.games = this.gameService.findAllResuming(user)
    );
  }
}
