import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EndGameComponent} from './component/end-game/end-game.component';
import {PlayerSummaryComponent} from './component/player-summary/player-summary.component';
import {BoardComponent} from './component/board/board.component';

const routes: Routes = [
  {
    path: ':gameId',
    children: [
      {
        path: '',
        redirectTo: 'before'
      },
      {
        path: 'before',
        component: PlayerSummaryComponent
      },
      {
        path: 'board',
        component: BoardComponent
      },
      {
        path: 'end',
        component: EndGameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
