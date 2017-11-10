import { Directive, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import {environment} from '../../../environments/environment';

@Directive({
  selector: '[appViewbox]'
})
export class ViewboxDirective {

  private _viewBoxX: number;

  private _viewBoxY: number;

  private _viewBoxWidth: number;

  private _viewBoxHeight: number;

  private _zoom: number;

  public constructor(private elementRef: ElementRef) {
    this._viewBoxX = this._viewBoxY = 0;
    this._zoom = environment.board.viewboxHeight;
    this._viewBoxHeight = this._zoom;
    this._viewBoxWidth = window.innerWidth * this._zoom / window.innerHeight;

    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxX(value: number) {
    this._viewBoxX = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxY(value: number) {
    this._viewBoxY = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxWidth(value: number) {
    this._viewBoxWidth = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxHeight(value: number) {
    this._viewBoxHeight = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set zoom(value: number) {
    this._zoom = value;
    this._viewBoxHeight = this._zoom;
    this._viewBoxWidth = window.innerWidth * this._zoom / window.innerHeight;
    this.changeViewBoxAttribute();
  }

  private changeViewBoxAttribute() {
    if (this._viewBoxX == null) {
      return;
    }
    if (this._viewBoxY == null) {
      return;
    }
    if (this._viewBoxWidth == null) {
      return;
    }
    if (this._viewBoxHeight == null) {
      return;
    }

    this.elementRef.nativeElement.setAttribute(
      'viewBox',
      this._viewBoxX + ' ' + this._viewBoxY + ' ' + this._viewBoxWidth + ' ' + this._viewBoxHeight
    );
  }
}
