import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'player'
  },
  {
    path: 'player',
    loadChildren: './module/player/player.module#PlayerModule'
  },
  {
    path: 'board',
    loadChildren: './module/board/board.module#BoardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
