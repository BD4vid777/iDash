import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'id-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  @Input() isDashboard: boolean = false;

  time: string = new Date().toLocaleTimeString();
  date: string = new Date().toLocaleDateString();

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.date = new Date().toLocaleDateString();
    }, 1000);
  }
}
