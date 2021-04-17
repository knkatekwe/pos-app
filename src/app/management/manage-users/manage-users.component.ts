import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalService } from 'src/app/shared/confirmation-modal/confirmation-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  user: Array<User> = [];
  selectedUser: User = new User;
  tempUser: User = null;
  p:any;
  manuallySelected = false;
  form: FormGroup;
  passwordSimilar: boolean;
  isSubmitting: boolean
  //role: any[] = ['user']
  //roles = new FormArray([]);

  searchText: any;
  @ViewChild('frmUser') frmUser: NgForm;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: ConfirmationModalService) { }

  ngOnInit() {
    this.isSubmitting = false
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

  selectUser(user: User){
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
    this.isSubmitting = true
    if(this.f.password.value === this.f.password_confirmation.value){
      //console.log(user)
      if(user.id == null){
        this.userService.register(user).subscribe(
          (result) => {
            if (result) {
              //console.log(this.selectedUser);
              this.dialog.confirm('System users', 'User saved successfully.', 'Ok')
              this.isSubmitting = false
              //alert('User has been saved successfully');
              this.clear();
              this.form.reset()
              this.loadAllUser();
            } else {
              this.dialog.confirm('System users', 'Failed to save user.', 'Ok')
              this.isSubmitting = false
              //alert('Failed to save the User');
            }
          }
        );
      }else{
        this.isSubmitting = true
        this.userService.update(user.id, user).subscribe(
          (result) => {
            if (result) {
              //console.log(this.selectedUser);
              //alert('User has been updated successfully');
              this.dialog.confirm('System users', 'User updated successfully.', 'Ok')
              this.isSubmitting = false
              this.clear()
              this.form.reset()
              this.loadAllUser()
              this.router.navigateByUrl('/login')
            } else {
              this.dialog.confirm('System users', 'User failed to update!', 'Ok')
              this.isSubmitting = false
              //alert('Failed to updated the user');
            }
          }
        );
      }
    }else{
      this.dialog.confirm('System users', 'Passwords should match...', 'Ok')
      this.isSubmitting = false
      //alert('Passwords should match...!')
    }

  }

  deletUser(userID: User){
    if (this.dialog.confirm('System users', 'Are you sure you want to delete user?', 'Ok')) {
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
