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
}
