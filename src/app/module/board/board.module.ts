import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BoardRoutingModule} from './board-routing.module';
import {EndGameComponent} from './component/end-game/end-game.component';
import {ViewboxDirective} from './directive/viewbox.directive';
import {CheckLineDirective} from './directive/check-line.directive';
import {FilterPipeModule} from 'ngx-filter-pipe';
import {OrderModule} from 'ngx-order-pipe';
import {PlayerSummaryComponent} from './component/player-summary/player-summary.component';
import {GridBoardComponent} from './component/grid-board/grid-board.component';
import { BoardComponent } from './component/board/board.component';
import {BoatComponent} from './component/boat/boat.component';
import {BuoyComponent} from './component/buoy/buoy.component';
import {ObstacleComponent} from './component/sea-element/obstacle.component';

@NgModule({
  declarations: [
    BoardComponent,
    BoatComponent,
    BuoyComponent,
    EndGameComponent,
    GridBoardComponent,
    PlayerSummaryComponent,
    ObstacleComponent,

    CheckLineDirective,
    ViewboxDirective,
    BoardComponent
  ],
  imports: [
    BoardRoutingModule,
    CommonModule,
    FilterPipeModule,
    OrderModule
  ]
})
export class BoardModule { }
