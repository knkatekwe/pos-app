import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  user: Array<User> = [];
  selectedUser: User = new User;
  tempUser: User = null;
  manuallySelected = false;
  form: FormGroup;
  passwordSimilar: boolean;
  //role: any[] = ['user']
  //roles = new FormArray([]);

  searchText: any;
  @ViewChild('frmUser', {static: false}) frmUser: NgForm;

  constructor(private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loadAllUser();
    this.initializeForm()
    this.passwordSimilar = false
  }

  loadAllUser(){
    this.userService.getUsers().subscribe(
      (result) => {
        this.user = result;
        console.log(this.user);
      }
    );
  }

  selectUser(user: User): void {
    this.clear();
    this.selectedUser = user;
    this.tempUser = Object.assign({}, user);
    this.manuallySelected = true;
  }

  clear(){
    const index = this.user.indexOf(this.selectedUser);

    if (index !== -1) {
      this.user[index] = this.tempUser;
      this.tempUser = null;
    }
    // tslint:disable-next-line: new-parens
    this.selectedUser = new User;
    this.manuallySelected = false;
  }

  // addRoles(value) {
  //   this.roles.push(new FormControl(value));
  //   this.f.roles = this.roles
  // }

  saveUser(user){
    if(this.f.password.value === this.f.password_confirmation.value){
      console.log(user)
      if(user.id == null){
        this.userService.register(user).subscribe(
          (result) => {
            if (result) {
              console.log(this.selectedUser);
              alert('User has been saved successfully');
              this.clear();
              this.form.reset()
              this.loadAllUser();
            } else {
              alert('Failed to save the User');
            }
          }
        );
      }else{
        this.userService.update(user.id, user).subscribe(
          (result) => {
            if (result) {
              console.log(this.selectedUser);
              alert('User has been updated successfully');
              this.clear();
              this.form.reset()
              this.loadAllUser();
            } else {
              alert('Failed to updated the user');
            }
          }
        );
      }
    }else{
      alert('Passwords should match...!')
    }

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

  initializeForm(){
    this.form = this.fb.group({
      id: [this.selectedUser.id],
      username: [ '', Validators.required ],
      email: [ ''],
      password: [ '', Validators.required ],
      password_confirmation: [ '', Validators.required ],
		});
  }

  get f(){
    return this.form.controls
  }

  rights: {name: string}[]=[
    {
      "name": "admin"
    },
    {
      "name": "user"
    }
  ]

}
