import {AfterContentChecked, Component, OnInit, TemplateRef} from '@angular/core';
import {Auth, AuthServiceService} from '../user-register/auth-service.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {HttpClient} from '@angular/common/http';
import {HeaderService} from './header.service';
import {HttpModule} from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthServiceService,
              private modalService: BsModalService,
              private headerService: HeaderService,
              private http: HttpClient) {
  }

  user: Auth;
  modalRef: BsModalRef;

  ngOnInit() {
    this.user = this.headerService.getUser();
    this.headerService.updateUserExp();
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  openEditUserModal(editUserModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(editUserModal);
  }

  updateUser() {
    this.authService.updateUser(this.user);
  }

  userRole() {
    return this.user.seller.role;
  }

  openAddPointsModal(addPointModal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addPointModal);
  }

  addPoints(type: string) {
    switch (type) {
      case 'attack':
        this.user.seller.experience.pointsToAdd--;
        this.user.seller.experience.attack++;
        break;
      case 'defence':
        this.user.seller.experience.pointsToAdd--;
        this.user.seller.experience.defence++;
        break;
      case 'knowledge':
        this.user.seller.experience.pointsToAdd--;
        this.user.seller.experience.knowledge++;
        break;
      case 'speedAttack':
        this.user.seller.experience.pointsToAdd--;
        this.user.seller.experience.speedAttack++;
        break;
    }
  }

  removePoints(type: string) {
    switch (type) {
      case 'attack':
        this.user.seller.experience.pointsToAdd++;
        this.user.seller.experience.attack--;
        break;
      case 'defence':
        this.user.seller.experience.pointsToAdd++;
        this.user.seller.experience.defence--;
        break;
      case 'knowledge':
        this.user.seller.experience.pointsToAdd++;
        this.user.seller.experience.knowledge--;
        break;
      case 'speedAttack':
        this.user.seller.experience.pointsToAdd++;
        this.user.seller.experience.speedAttack--;
        break;
    }
  }

  updatePoints() {
    this.http.put('http://localhost:8080/api/exp/points', this.user.seller.experience).subscribe(resp => {
      console.log(resp);
    });
  }
}
