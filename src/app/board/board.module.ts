import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import {BoardRoutingModule} from './board-routing.module';
import {ShareModule} from '../share/share.module';
import {FormsModule} from '@angular/forms';
import { ViewboxDirective } from './directive/viewbox.directive';
import { GridBoardComponent } from './grid-board/grid-board.component';
import {OrderModule} from 'ngx-order-pipe';
import { SeaElementComponent } from './sea-element/sea-element.component';
import { BoatComponent } from './boat/boat.component';
import { CheckLineDirective } from './directive/check-line.directive';
import { CardPreviewComponent } from './card-preview/card-preview.component';
import { BuoyComponent } from './buoy/buoy.component';
import { EndGameComponent } from './end-game/end-game.component';
import { PlayerSummaryComponent } from './player-summary/player-summary.component';
import { IndexingGameComponentComponent } from './indexing-game-component/indexing-game-component.component';

@NgModule({
  imports: [
    BoardRoutingModule,
    CommonModule,
    FormsModule,
    OrderModule,
    ShareModule
  ],
  declarations: [
    GameComponent,
    GridBoardComponent,
    ViewboxDirective,
    SeaElementComponent,
    BoatComponent,
    CheckLineDirective,
    CardPreviewComponent,
    BuoyComponent,
    EndGameComponent,
    PlayerSummaryComponent,
    IndexingGameComponentComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BoardModule { }
