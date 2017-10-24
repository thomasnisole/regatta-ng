import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGameComponent} from './create-game/create-game.component';
import {GameComponent} from './game/game.component';
import { EndGameComponent } from './end-game/end-game.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateGameComponent
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
