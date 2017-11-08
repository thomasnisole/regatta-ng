import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.scss']
})
export class RemoteComponent implements OnInit {

  @Input()
  public isVisible: boolean;

  @Output()
  public isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public onLeft: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onRight: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onTop: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onBottom: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onRotateLeft: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onRotateRight: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onZoomIn: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onZoomOut: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onReset: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public onValid: EventEmitter<void> = new EventEmitter<void>();

  private touchActionInterval: number = 60;

  private interval: any;

  private myLatestTap: any;

  public constructor() { }

  public ngOnInit(): void {

  }

  public onStop(): void {
    clearInterval(this.interval);
  }

  public onLeftButton(): void {
    this.onLeft.emit();
    this.interval = setInterval(() => this.onLeft.emit(), this.touchActionInterval);
  }

  public onRightButton(): void {
    this.onRight.emit();
    this.interval = setInterval(() => this.onRight.emit(), this.touchActionInterval);
  }

  public onTopButton(): void {
    this.onTop.emit();
    this.interval = setInterval(() => this.onTop.emit(), this.touchActionInterval);
  }

  public onBottomButton(): void {
    this.onBottom.emit();
    this.interval = setInterval(() => this.onBottom.emit(), this.touchActionInterval);
  }

  public onRotateLeftButton(): void {
    this.onRotateLeft.emit();
  }

  public onRotateRightButton(): void {
    this.onRotateRight.emit();
  }

  public onZoomOutButton(): void {
    this.onZoomOut.emit();
    this.interval = setInterval(() => this.onZoomOut.emit(), this.touchActionInterval);
  }

  public onZoomInButton(): void {
    this.onZoomIn.emit();
    this.interval = setInterval(() => this.onZoomIn.emit(), this.touchActionInterval);
  }

  public isButtonVisible(emitter: EventEmitter<void>): boolean {
    return emitter.observers.length > 0;
  }

  public close() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
