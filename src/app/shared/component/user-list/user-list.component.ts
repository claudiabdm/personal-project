import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() onlyImage: boolean;

  private _userList: User[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this._userList = this.authService.userGroup.members;
  }

  get userList(): User[]{
    return this._userList;
  }

}
