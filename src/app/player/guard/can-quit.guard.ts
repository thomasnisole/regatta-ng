import { Injectable } from '@angular/core';
import { PlayComponent } from '../play/play.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {PlatformLocation} from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanQuitGuard implements CanDeactivate<PlayComponent> {

  public constructor(private location: PlatformLocation) { }

  public canDeactivate(
    component: PlayComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      if (!component.player.isLeft) {
        component.confirmLeave();

        this.location.pushState({}, 'RegattaNg', '/player/games');
      }

      return true;
  }
}
