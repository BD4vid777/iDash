import { Component, inject } from '@angular/core';
import { WINDOW } from "../../shared/window.token";

@Component({
  selector: 'id-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile
}
