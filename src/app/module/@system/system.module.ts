import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from './service/auth.service';
import {DataService} from './service/data.service';
import {GeometryService} from './service/geometry.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    DataService,
    GeometryService
  ]
})
export class SystemModule {

  public constructor(@Optional() @SkipSelf() parentModule: SystemModule) {
    if (parentModule) {
      throw new Error('SystemModule is already loaded. Import it in the AppModule only');
    }
  }
}
