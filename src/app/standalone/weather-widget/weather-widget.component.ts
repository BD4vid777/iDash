import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'id-weather-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent {

  showWeather() {
    // TODO: implement this method - show in new window
  }
}
