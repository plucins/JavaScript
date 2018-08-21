import { Component, OnInit } from '@angular/core';
import {UsersManagementService} from './users-management.service';
import {Seller} from '../shared/policy';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  constructor(private usersService: UsersManagementService) { }

  users: Seller[];
  roles: string[];

  ngOnInit() {
    this.getAllUsers();
    this.getAvailableRoles();
  }

  getAllUsers() {
    return this.usersService.getAllUsers().subscribe(resp => {
      this.users = resp;
    });
  }

  getAvailableRoles() {
    this.usersService.getAvailableRoles().subscribe(resp => {
      this.roles = resp;
    })
  }

  updateUser(user) {
    console.log(user);
    this.usersService.updateUser(user).subscribe(resp => {
      console.log(resp);
    });
  }


}
