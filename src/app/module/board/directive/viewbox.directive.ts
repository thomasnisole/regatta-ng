import { Directive, ElementRef, Input } from '@angular/core';
import {environment} from '../../../../environments/environment';

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
  zoom: number;
}

@Directive({
  selector: '[appViewbox]'
})
export class ViewboxDirective {

  private viewBox: ViewBox;

  public constructor(private elementRef: ElementRef) {
    this.viewBox = {
      x: 0,
      y: 0,
      height: environment.board.viewboxHeight,
      width: window.innerWidth * environment.board.viewboxHeight / window.innerHeight,
      zoom: environment.board.viewboxHeight
    };

    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxX(value: number) {
    this.viewBox.x = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxY(value: number) {
    this.viewBox.y = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxWidth(value: number) {
    this.viewBox.width = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set viewBoxHeight(value: number) {
    this.viewBox.height = value;
    this.changeViewBoxAttribute();
  }

  @Input()
  public set zoom(value: number) {
    this.viewBox.zoom = this.viewBox.height = value;
    this.viewBox.width = window.innerWidth * this.viewBox.zoom / window.innerHeight;
    this.changeViewBoxAttribute();
  }

  private changeViewBoxAttribute() {
    if (this.viewBox.x == null) {
      return;
    }
    if (this.viewBox.y == null) {
      return;
    }
    if (this.viewBox.width == null) {
      return;
    }
    if (this.viewBox.height == null) {
      return;
    }

    this.elementRef.nativeElement.setAttribute(
      'viewBox',
      `${ this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`
    );
  }
}
