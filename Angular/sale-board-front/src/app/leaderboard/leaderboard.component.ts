import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private config: NgbProgressbarConfig, private http: HttpClient) {
    config.max = 100;
    config.striped = true;
    config.animated = true;
    config.type = 'success';
    config.height = '20px';
  }

  allUsers;

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get('http://localhost:8080/api/seller/byExp').subscribe(resp => {
      this.allUsers = resp;
    });
  }

  transform(values) {
    if (values) {
      return values.reverse();
    }
  }


}
