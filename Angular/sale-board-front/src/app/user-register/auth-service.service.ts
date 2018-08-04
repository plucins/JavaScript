import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';



class AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  experience: Experience;
  role: string;
}

export class Auth {
  token: string;
  seller: AuthUser;
}

@Injectable()
export class AuthServiceService {

  authUser = new Auth();

  constructor(private router: Router,
              private http: HttpClient) {
  }


  getResponseFromAuth(resp: any) {
    this.authUser = resp;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  getUser(): Auth {
    return this.authUser;
  }


  updateUser(user: Auth) {
    localStorage.clear();
    localStorage.setItem('authUser', JSON.stringify(user));

    const payload = {
      id: user.seller.id,
      firstName: user.seller.firstName,
      lastName: user.seller.lastName,
    };

    this.http.put('http://localhost:8080/api/seller', payload).subscribe(resp => {
      console.log(resp);
    });
  }
}
