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
  public left: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public right: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public top: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public bottom: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public rotateLeft: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public rotateRight: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public zoomIn: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public zoomOut: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public reset: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public valid: EventEmitter<void> = new EventEmitter<void>();

  private touchActionInterval: number = 60;

  private interval: any;

  public constructor() { }

  public ngOnInit(): void {

  }

  public onStop(): void {
    clearInterval(this.interval);
  }

  public onLeftButton(): void {
    this.left.emit();
    this.interval = setInterval(() => this.left.emit(), this.touchActionInterval);
  }

  public onRightButton(): void {
    this.right.emit();
    this.interval = setInterval(() => this.right.emit(), this.touchActionInterval);
  }

  public onTopButton(): void {
    this.top.emit();
    this.interval = setInterval(() => this.top.emit(), this.touchActionInterval);
  }

  public onBottomButton(): void {
    this.bottom.emit();
    this.interval = setInterval(() => this.bottom.emit(), this.touchActionInterval);
  }

  public onRotateLeftButton(): void {
    this.rotateLeft.emit();
  }

  public onRotateRightButton(): void {
    this.rotateRight.emit();
  }

  public onZoomOutButton(): void {
    this.zoomOut.emit();
    this.interval = setInterval(() => this.zoomOut.emit(), this.touchActionInterval);
  }

  public onZoomInButton(): void {
    this.zoomIn.emit();
    this.interval = setInterval(() => this.zoomIn.emit(), this.touchActionInterval);
  }

  public isButtonVisible(emitter: EventEmitter<void>): boolean {
    return emitter.observers.length > 0;
  }

  public close() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
