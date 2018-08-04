import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from './auth-service.service';
import {Router} from '@angular/router';

export class User {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user = new User();
  loginUser = new User();
  isUserExist = false;
  isPasswordMismatch = false;
  errLogin = false;
  userRegisterCorrectly = false;

  registerForm: FormGroup;
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  loginEmail: FormControl;
  loginPassword: FormControl;

  constructor(private http: HttpClient,
              private authService: AuthServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.createFormControl();
    this.createRegisterForm();
    this.createFormLoginControl();
    this.createLoginForm();
  }

  registerUser() {
    const options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.http.post('http://localhost:8080/api/seller', this.user, options).subscribe(resp => {
      console.log(resp);
        this.userRegisterCorrectly = true;
        this.user = new User();
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.isUserExist = true;
          this.user = new User();
        }
        if (err.status === 409) {
          this.isPasswordMismatch = true;
        }
      });
  }

  removeWarning() {
    this.isUserExist = false;
    this.isPasswordMismatch = false;
  }

  createFormControl() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^((([!#$%&\'*+\\-/=?^_`{|}~\\w])|([!#$%&\'*+\\-/=?^_`{|}~\\w][!#$%&\'*+' +
        '\\-/=?^_`{|}~\\.\\w]{0,}[!#$%&\'*+\\-/=?^_`{|}~\\w]))[@]\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)$')
    ]);
    this.password = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
  }

  createFormLoginControl() {
    this.loginEmail = new FormControl('', [
      Validators.required,
      Validators.pattern('^((([!#$%&\'*+\\-/=?^_`{|}~\\w])|([!#$%&\'*+\\-/=?^_`{|}~\\w][!#$%&\'*+' +
        '\\-/=?^_`{|}~\\.\\w]{0,}[!#$%&\'*+\\-/=?^_`{|}~\\w]))[@]\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*)$')
    ]);
    this.loginPassword = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
  }

  createRegisterForm() {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      loginEmail: this.loginEmail,
      loginPassword: this.loginPassword
    });
  }

  submitLogin() {

    const payload = {
      email: this.loginUser.email,
      password: this.loginUser.password,
    };

    const options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.http.post('http://localhost:8080/authenticate', JSON.stringify(payload), options).toPromise().then(resp => {
      localStorage.setItem('authUser', JSON.stringify(resp));
      this.authService.getResponseFromAuth(resp);
      this.router.navigate(['']);
      location.reload();
    }).catch((err: HttpErrorResponse) => {
      if (err.status === 400) {
        this.errLogin = true;
        this.loginUser = new User();
      }
    });
  }
}
