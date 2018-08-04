import {Component, Injectable, Input, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../user-register/auth-service.service';
import {SidebarService} from './sidebar.service';
import {Policy} from '../shared/policy';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {

  authUser: Auth;
  sidebarService: SidebarService;

  constructor(private http: HttpClient,
              private service: SidebarService) {
    this.sidebarService = service;
    this.authUser = JSON.parse(localStorage.getItem('authUser'));
  }

  ngOnInit() {
    this.sidebarService.getLast6Policies();
  }


}
