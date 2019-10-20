import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../@core/model/user.model';
import {CurrentUserState} from '../../state/current-user/current-user.state';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Select(CurrentUserState)
  public user$: Observable<User>;

  @Input()
  public direction: string = 'left';

  public sideBarOpened: boolean = false;
}
