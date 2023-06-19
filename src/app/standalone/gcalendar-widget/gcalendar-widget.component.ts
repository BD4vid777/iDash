import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'id-gcalendar-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gcalendar-widget.component.html',
  styleUrls: ['./gcalendar-widget.component.scss']
})
export class GcalendarWidgetComponent {

  showCalendar() {
    // TODO: implement this method - show in new window
  }
}
