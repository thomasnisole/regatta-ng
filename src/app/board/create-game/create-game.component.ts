import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Game} from '../../share/model/game';
import {GameService} from '../../share/service/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  public name: string;

  public pass: string;

  public constructor(private gameService: GameService, private router: Router) {}

  public ngOnInit(): void {

  }

  public onSubmit(): void {
    this.gameService.create(this.name, this.pass).subscribe(
      (game: Game) => this.router.navigate(['/board/' + game.id])
    );
  }
}
