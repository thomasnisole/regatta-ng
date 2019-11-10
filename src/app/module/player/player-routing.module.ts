import { NgModule } from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {CreateGameComponent} from './component/create-game/create-game.component';
import {ResumeComponent} from './component/resume/resume.component';
import {JoinComponent} from './component/join/join.component';
import {LoginComponent} from './component/login/login.component';
import {UserGuard} from './guard/user.guard';
import {RegisterComponent} from './component/register/register.component';
import {PlayComponent} from './component/play/play.component';

const routes: Route[] = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [
      UserGuard
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
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
            redirectTo: 'join',
            pathMatch: 'full'
          },
          {
            path: 'join',
            component: JoinComponent,
            data: {
              title: 'Rejoindre une partie'
            }
          },
          {
            path: 'resume',
            component: ResumeComponent,
            data: {
              title: 'Reprendre une partie'
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
            path: ':gameId',
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
              },
              {
                path: 'play',
                component: PlayComponent
              }
            ]
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
