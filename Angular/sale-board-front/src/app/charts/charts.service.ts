import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Policy} from '../shared/policy';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ChartsService {

  constructor(private http: HttpClient) {
    this.getAllPolices();
  }


  getAllPolices() {
    return this.http.get('http://localhost:8080/api/chart/totalByDay');
  }

}
