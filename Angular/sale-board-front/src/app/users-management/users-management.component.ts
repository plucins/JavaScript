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

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    return this.usersService.getAllUsers().subscribe(resp => {
      this.users = resp;
    });
  }


}
