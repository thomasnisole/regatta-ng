import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../@core/model/user.model';
import {UserService} from '../../../@core/service/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public user$: Observable<User>;

  @Input()
  public direction: string = 'left';

  public sideBarOpened: boolean = false;

  public constructor(userService: UserService) {
    this.user$ = userService.findUserAccount();
  }

}
