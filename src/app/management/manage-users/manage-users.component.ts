import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  user: Array<User> = [];
  // tslint:disable-next-line: new-parens
  selectedUser: User = new User;
  tempUser: User = null;
  manuallySelected = false;

  searchText: any;
  // @ViewChild('frmUser') frmUser: NgForm;
  @ViewChild('frmUser', {static: false}) frmUser: NgForm;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadAllUser();
  }

  loadAllUser(){
    // this.userService.getAllUser().subscribe(
    //   (result) => {
    //     this.user = result;

    //     console.log(this.user);
    //   }
    // );
  }

  selectUser(user: User): void {
    this.clear();
    this.selectedUser = user;
    this.tempUser = Object.assign({}, user);
    this.manuallySelected = true;
  }

  clear(): void {
    const index = this.user.indexOf(this.selectedUser);

    if (index !== -1) {
      this.user[index] = this.tempUser;
      this.tempUser = null;
    }
    // tslint:disable-next-line: new-parens
    this.selectedUser = new User;
    this.manuallySelected = false;
  }

  saveUser(){
    // this.userService.saveUser(this.selectedUser).subscribe(
    //   (result) => {
    //     if (result) {
    //       console.log(this.selectedUser);
    //       alert('User has been saved successfully');
    //       this.clear();
    //       this.loadAllUser();
    //     } else {
    //       alert('Failed to save the User');
    //     }
    //   }
    // );

  }

  deletUser(userID: User){
    if (confirm('Are you sure you want to delete this customer?')) {
      // this.userService.deletePaymentType(userID.id).subscribe(
      //   (result) => {
      //     if (result) {
      //       alert('User has been Deleted successfully');
      //     } else {
      //       alert('Failed to deleted User');
      //     }
      //     this.loadAllUser();
      //   }
      // );
    }
  }

}
