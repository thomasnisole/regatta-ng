import { CreateGameComponent } from './create-game/create-game.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesComponent} from './games/games.component';
import {RegisterComponent} from './register/register.component';
import {PlayComponent} from './play/play.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { CanQuitGuard } from './guard/can-quit.guard';
import { TestGuard } from './guard/test.guard';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        data: {
          title: 'Accueil'
        }
      },
      {
        path: 'games',
        children: [
          {
            path: '',
            component: GamesComponent,
            data: {
              title: 'Rejoindre une partie'
            }
          },
          {
            path: 'create',
            component: CreateGameComponent,
            data: {
              title: 'Créer une partie'
            }
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
                component: RegisterComponent,
                data: {
                  title: 'Inscription'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'games/:id/play',
    component: PlayComponent,
    canActivate: [TestGuard],
    canDeactivate: [CanQuitGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
