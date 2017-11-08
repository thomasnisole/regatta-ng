import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game/game.component';
import { EndGameComponent } from './end-game/end-game.component';
import { IndexingGameComponentComponent } from './indexing-game-component/indexing-game-component.component';


const routes: Routes = [
  {
    path: '',
    component: IndexingGameComponentComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: GameComponent
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
