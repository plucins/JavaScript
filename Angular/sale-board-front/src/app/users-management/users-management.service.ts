import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Seller} from '../shared/policy';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UsersManagementService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Seller[]> {
   return this.http.get<Seller[]>('http://localhost:8080/api/seller')
  }

  getAvailableRoles(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8080/api/seller/roles');
  }

  updateUser(user: Seller): Observable<Seller> {
    return this.http.put<Seller>('http://localhost:8080/api/seller',user);
  }
}
