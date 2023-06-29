import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSignInService } from "../../shared/google-sign-in.service";

@Component({
  selector: 'id-gmail-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gmail-widget.component.html',
  styleUrls: ['./gmail-widget.component.scss']
})
export class GmailWidgetComponent {

  private loginService = inject(GoogleSignInService)

  showGMail() {
    // TODO: implement this method - show in new window
    this.loginService.getUserMails()
  }
}
