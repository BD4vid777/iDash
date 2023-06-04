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

  time: string = new Date().toLocaleTimeString("en-GB");
  date: string = new Date().toLocaleDateString("en-GB");

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleTimeString("en-GB");
      this.date = new Date().toLocaleDateString("en-GB");
    }, 1000);
  }
}
