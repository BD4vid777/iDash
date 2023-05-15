import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'id-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  time: string = new Date().toLocaleTimeString();
  date: string = new Date().toLocaleDateString();

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.date = new Date().toLocaleDateString();
    }, 1000);
  }
}
