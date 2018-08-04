import {Component, OnInit} from '@angular/core';
import {ChartsService} from './charts.service';
import {Chart} from 'chart.js';

export class ChartTotal {
  date: string;
  amount: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  chart = [];

  constructor(private charts: ChartsService) {
  }

  ngOnInit() {
    this.charts.getAllPolices().subscribe((resp: ChartTotal[]) => {

      const policyValues = [];
      const days = [];

      resp.forEach(e => {
        policyValues.push(e.amount);
        days.push(e.date);
      });

      this.chart = new Chart('canvas', {
        type: 'horizontalBar',
        data: {
          labels: days,
          datasets: [
            {
              data: policyValues,
              backgroundColor: '#D6CDC8',
              borderWidth: '1',
              borderColor: '#C4A89B',
              fill: true
            },
          ]
        },
        options: {
          legend: {
            display: false
          }
        }
      });


    });
  }
}
