import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Auth} from './user-register/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  user = new Auth();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.user) {
      return next.handle(req);
    }

    this.user = JSON.parse(localStorage.getItem('authUser'));

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.user.token)
        .set('Accept', 'application/json')
        .set('Access-Control-Allow-Origin', 'http://localhost:4200')
    });

    return next.handle(authReq);
  }

}
