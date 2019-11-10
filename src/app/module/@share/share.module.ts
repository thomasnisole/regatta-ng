import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CardImageComponent } from './component/card-image/card-image.component';

@NgModule({
  declarations: [
    CardImageComponent
  ],
  exports: [
    CardImageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShareModule { }
