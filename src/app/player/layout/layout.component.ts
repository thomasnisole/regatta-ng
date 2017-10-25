import { Component, OnInit } from '@angular/core';
import { UserService } from '../../share/service/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../share/model/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public user: Observable<User>;

  public constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.user = this.userService.findUserAccount();
  }
}
