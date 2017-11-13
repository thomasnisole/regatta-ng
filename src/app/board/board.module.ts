import { CommonModule } from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {OrderModule} from 'ngx-order-pipe';
import {ShareModule} from '../share/share.module';
import {BoardRoutingModule} from './board-routing.module';
import { BoatComponent } from './boat/boat.component';
import { BuoyComponent } from './buoy/buoy.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';
import { CheckLineDirective } from './directive/check-line.directive';
import { ViewboxDirective } from './directive/viewbox.directive';
import { EndGameComponent } from './end-game/end-game.component';
import { GameComponent } from './game/game.component';
import { GridBoardComponent } from './grid-board/grid-board.component';
import { IndexingGameComponentComponent } from './indexing-game-component/indexing-game-component.component';
import { PlayerSummaryComponent } from './player-summary/player-summary.component';
import { SeaElementComponent } from './sea-element/sea-element.component';

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
