import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameComponent } from './game/game.component';
import {BoardRoutingModule} from './board-routing.module';
import {ShareModule} from '../share/share.module';
import {FormsModule} from '@angular/forms';
import { ViewboxDirective } from './directive/viewbox.directive';
import { GridBoardComponent } from './grid-board/grid-board.component';
import {OrderModule} from 'ngx-order-pipe';
import { BuoyDirective } from './directive/buoy.directive';
import { SeaElementComponent } from './sea-element/sea-element.component';
import { BoatComponent } from './boat/boat.component';
import { CheckLineDirective } from './directive/check-line.directive';
import { CardPreviewComponent } from './card-preview/card-preview.component';

@NgModule({
  imports: [
    BoardRoutingModule,
    CommonModule,
    FormsModule,
    OrderModule,
    ShareModule
  ],
  declarations: [
    CreateGameComponent,
    GameComponent,
    GridBoardComponent,
    ViewboxDirective,
    BuoyDirective,
    SeaElementComponent,
    BoatComponent,
    CheckLineDirective,
    CardPreviewComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BoardModule { }
