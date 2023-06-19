import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'id-gmail-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gmail-widget.component.html',
  styleUrls: ['./gmail-widget.component.scss']
})
export class GmailWidgetComponent {

  showGMail() {
    // TODO: implement this method - show in new window
  }
}
