import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChoiceComponent} from './choice/choice.component';
import {UserGuard} from './user.guard';

const routes: Routes = [
  {
    path: '',
    component: ChoiceComponent
  },
  {
    path: 'player',
    canActivate: [
      UserGuard
    ],
    loadChildren: 'app/player/player.module#PlayerModule'
  },
  {
    path: 'board',
    loadChildren: 'app/board/board.module#BoardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
