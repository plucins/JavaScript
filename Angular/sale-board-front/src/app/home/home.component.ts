import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Policy} from '../shared/policy';

import {Auth} from '../user-register/auth-service.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {SidebarService} from '../sidebar/sidebar.service';
import {HeaderComponent} from '../header/header.component';
import {HeaderService} from '../header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todayPolicies;
  sevenDaysPolicies;
  thirtyDaysPolicies;
  authUser: Auth;
  modalRef: BsModalRef;
  @Input() policyToUpdate: Policy;


  constructor(private http: HttpClient,
              private modalService: BsModalService,
              private sidebar: SidebarService,
              private header: HeaderService) {
  }

  ngOnInit() {
    this.authUser = JSON.parse(localStorage.getItem('authUser'));
    if (this.authUser != null) {
      this.getPolices();
    }
  }

  getPolices() {
    this.todayPolicies = this.getPolicesFromToday();
    this.sevenDaysPolicies = this.getPolicesFromSeven();
    this.thirtyDaysPolicies = this.getPolicesFromThirty();
  }

  getPolicesFromToday() {
    const payload = {
      userEmail: this.authUser.seller.email,
      daysAmount: 0
    };
    this.http.post<Policy>('http://localhost:8080/api/policy/listByDate', payload).subscribe(resp => {
      console.log(resp);
      this.todayPolicies = resp;
    });
  }

  getPolicesFromSeven() {
    const payload = {
      userEmail: this.authUser.seller.email,
      daysAmount: 6
    };
    this.http.post<Policy>('http://localhost:8080/api/policy/listByDate', payload).subscribe(resp => {
      console.log(resp);
      this.sevenDaysPolicies = resp;
    });
  }

  getPolicesFromThirty() {
    const payload = {
      userEmail: this.authUser.seller.email,
      daysAmount: 29
    };
    this.http.post<Policy>('http://localhost:8080/api/policy/listByDate', payload).subscribe(resp => {
      console.log(resp);
      this.thirtyDaysPolicies = resp;
    });
  }

  openEditPolicyModal(editPolicyModal: TemplateRef<any>, p: Policy) {
    this.policyToUpdate = p;
    this.modalRef = this.modalService.show(editPolicyModal);
  }

  updatePolicy() {
    this.http.put('http://localhost:8080/api/policy/' + this.policyToUpdate.id, this.policyToUpdate).subscribe(resp => {
      console.log(resp);
    });
  }

  removePolicy(p: Policy) {
    this.http.delete('http://localhost:8080/api/policy/' + p.id).subscribe(resp => {
      this.getPolicesFromToday();
      this.sidebar.getLast6Policies();
      this.header.updateUserExp();
    });
  }

}
