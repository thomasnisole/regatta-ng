import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesComponent} from './games/games.component';
import {RegisterComponent} from './register/register.component';
import {PlayComponent} from './play/play.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      }
    ]
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
          },
          {
            path: 'play',
            component: PlayComponent
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
