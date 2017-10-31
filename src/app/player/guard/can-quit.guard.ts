import { Injectable } from '@angular/core';
import { PlayComponent } from '../play/play.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class CanQuitGuard implements CanDeactivate<PlayComponent> {

  public constructor(private location: PlatformLocation) {
    console.log('enculé');
  }

  public canDeactivate(
    component: PlayComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      console.log(component.player);
      if (!component.player.isLeft) {
        this.location.pushState({}, 'RegattaNg - liste games', '/player/games');
        component.confirmLeave();

        return false;
      }

      return false;
  }
}
