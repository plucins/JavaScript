import {Component, Inject, Input, OnInit} from '@angular/core';
import {Policy} from '../shared/policy';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Auth} from '../user-register/auth-service.service';
import {HeaderComponent} from '../header/header.component';
import {SidebarService} from '../sidebar/sidebar.service';
import {HeaderService} from '../header/header.service';


const now = new Date();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  policy = new Policy();
  currentDate;
  user: Auth;


  policyRegistered = false;

  constructor(private http: HttpClient,
              @Inject(SidebarService) private sidebar,
              private header: HeaderService) {
  }

  ngOnInit() {
    this.selectToday();
  }

 logPolicy() {
    this.policy.saleDate = this.currentDate.year + '-' + (this.currentDate.month < 10 ? '0'
      + this.currentDate.month : this.currentDate.month) + '-' + (this.currentDate.day < 10 ? '0'
      + this.currentDate.day : this.currentDate.day);

    this.user = JSON.parse(localStorage.getItem('authUser'));
    console.log(this.user);

    this.policy.seller.email = this.user.seller.email;

    const options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

    this.http.post<Policy>('http://localhost:8080/api/policy', this.policy, options).toPromise().then(resp => {

      this.sidebar.getLast6Policies();
      this.header.updateUserExp();
      this.policyRegistered = true;
      this.policy = new Policy();
    });
  }

  selectToday() {
    this.currentDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  setFOrm() {
    this.policy.brand = 'Brand1';
    this.policy.policyNumber = '987654321111';
    this.policy.customer.phoneNumber = '654321234';
    this.policy.policyValue = '5674';
    this.policy.incomeSource = 'Opcja1';
    this.policy.extraInfo = 'tutaj wspisuje moja super wazna wiadomosc';
  }


}
