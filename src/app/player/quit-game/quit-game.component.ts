import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quit-game',
  templateUrl: './quit-game.component.html',
  styleUrls: ['./quit-game.component.scss']
})
export class QuitGameComponent implements OnInit {

  public constructor(public activeModal: NgbActiveModal) { }

  public ngOnInit(): void {}
}
