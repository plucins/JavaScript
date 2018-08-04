import {Injectable} from '@angular/core';
import {Policy} from '../shared/policy';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class SidebarService {

  get policies(): Policy {
    return this._policies;
  }

  constructor(private http: HttpClient) {
  }

  private _policies: Policy;


  getLast6Policies() {
    this.http.get<Policy>('http://localhost:8080/api/policy/6').subscribe(resp => {
      this._policies = resp;
      console.log(resp);
    });
  }

}
