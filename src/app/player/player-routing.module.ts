import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGameComponent } from './create-game/create-game.component';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { LayoutComponent } from './layout/layout.component';
import {PlayComponent} from './play/play.component';
import {RegisterComponent} from './register/register.component';
import { ResumeComponent } from './resume/resume.component';

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
    component: PlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
