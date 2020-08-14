import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Role } from 'src/app/core/models/user';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {

  constructor(private userService: UserService) { }

  Role = Role

  ngOnInit() {
  }

  logout(){
    this.userService.purgeAuth();
    console.log('logged out...')
  }

}
