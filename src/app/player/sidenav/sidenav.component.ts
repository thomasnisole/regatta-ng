import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../share/model/user';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../share/service/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input()
  public user: Observable<User>;

  @Input()
  public direction: string = 'left';

  public sideBarOpened: boolean = false;

  public constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.user = this.userService.findUserAccount();
  }
}
