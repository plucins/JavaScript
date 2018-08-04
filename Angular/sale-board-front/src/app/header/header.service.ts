import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../user-register/auth-service.service';


@Injectable()
export class HeaderService {

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('authUser'));
  }

  user: Auth;

  updateUserExp() {
    if (this.user) {
      this.http.get<Experience>('http://localhost:8080/api/exp/' + this.user.seller.id).subscribe(resp => {
        this.user.seller.experience = resp;
      });
    }
  }

  getUser(): Auth {
    return this.user;
  }
}
