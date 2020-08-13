import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout(){
    this.userService.purgeAuth();
  }

}
