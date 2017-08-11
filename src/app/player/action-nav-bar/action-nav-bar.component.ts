import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-nav-bar',
  templateUrl: './action-nav-bar.component.html',
  styleUrls: ['./action-nav-bar.component.scss']
})
export class ActionNavBarComponent implements OnInit {

  @Input()
  public flagIsVisible: boolean;

  @Input()
  public clearIsVisible: boolean;

  @Input()
  public trapIsVisible: boolean;

  @Input()
  public trashIsVisible: boolean;

  @Input()
  public playIsVisible: boolean;

  @Input()
  public tackIsVisible: boolean;

  @Input()
  public terminateIsVisible: boolean;

  @Input()
  public mode: string;

  @Output()
  public onStart: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onMoveMap: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onTackBabord: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onTackTribord: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onTrash: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onPlay: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onTrap: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onClearPreview: EventEmitter<void> = new EventEmitter<void>();

  public currentAction: EventEmitter<void>;

  public constructor() { }

  public ngOnInit(): void {
    this.currentAction = this.onPlay;
    this.mode = 'play';
  }

  public changeToPlayMode(): void {
    this.mode = 'play';
    this.currentAction = this.onPlay;
  }

  public changeToTrashMode(): void {
    this.mode = 'trash';
    this.currentAction = this.onTrash;
  }

  public changeToTrapMode(): void {
    this.mode = 'trap';
    this.currentAction = this.onTrap;
  }
}
