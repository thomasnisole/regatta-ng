import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerRoutingModule} from './player-routing.module';
import { GamesComponent } from './games/games.component';
import {ShareModule} from '../share/share.module';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import { BoatNumberValidatorDirective } from './directive/boat-number-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PlayerRoutingModule,
    ShareModule
  ],
  declarations: [GamesComponent, RegisterComponent, BoatNumberValidatorDirective]
})
export class PlayerModule {}
