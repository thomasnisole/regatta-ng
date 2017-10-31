import { Component, OnInit } from '@angular/core';
import { UserService } from '../../share/service/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../share/model/user';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public user: Observable<User>;

  public title: string;

  public constructor(private userService: UserService, router: Router, activatedRoute: ActivatedRoute) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => activatedRoute)
      .map((route: ActivatedRoute) => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event: any) => this.title = event['title']);
  }

  public ngOnInit(): void {
    this.user = this.userService.findUserAccount();
  }
}
