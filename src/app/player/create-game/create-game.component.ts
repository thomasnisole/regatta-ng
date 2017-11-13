import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../share/model/user';
import { CastSenderService } from '../../share/service/cast-sender.service';
import { GameService } from '../../share/service/game.service';
import { UserService } from '../../share/service/user.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  public name: string;

  public pass: string;

  public user: User;

  public cast: boolean = true;

  private gameId: string;

  public constructor(
    private userService: UserService,
    private gameService: GameService,
    private router: Router,
    private castSendService: CastSenderService) {}

  public ngOnInit(): void {
    setTimeout(() => {
      this.castSendService.initialize((status) => {});
    }, 1000);

    this.userService.findUserAccount().subscribe(
      (user: User) => this.user = user
    );
  }

  public onSubmit(): void {
    if (this.cast) {
      this.castSendService.makeRequest(() => this.submit(), () => this.submit());
    } else {
      this.submit();
    }
  }

  private submit() {
    this.gameService.create(this.name, this.pass, this.user.id).subscribe(
      (id: string) => {
        this.gameId = id;
        this.router.navigate(['/player/games', this.gameId, 'register']);
      }
    );
  }
}
