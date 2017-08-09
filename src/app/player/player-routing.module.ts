import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesComponent} from './games/games.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    children: [
      {
        path: '',
        component: GamesComponent
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            redirectTo: 'register',
            pathMatch: 'full'
          },
          {
            path: 'register',
            component: RegisterComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
