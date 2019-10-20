import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-action-nav-bar',
  templateUrl: './action-nav-bar.component.html',
  styleUrls: ['./action-nav-bar.component.scss']
})
export class ActionNavBarComponent implements OnInit {

  public mode: string;

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

  @Output()
  public start: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public moveMap: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public tackBabord: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public tackTribord: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public trash: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public play: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public trap: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public clearPreview: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public modeChange: EventEmitter<string> = new EventEmitter<string>();

  public currentAction: EventEmitter<void>;

  public constructor() { }

  public ngOnInit(): void {
    this.currentAction = this.play;
    this.mode = 'play';
    this.modeChange.emit(this.mode);
  }

  public changeToPlayMode(): void {
    this.mode = 'play';
    this.currentAction = this.play;
    this.modeChange.emit(this.mode);
  }

  public changeToTrashMode(): void {
    this.mode = 'trash';
    this.currentAction = this.trash;
    this.modeChange.emit(this.mode);
  }

  public changeToTrapMode(): void {
    this.mode = 'trap';
    this.currentAction = this.trap;
    this.modeChange.emit(this.mode);
  }
}
