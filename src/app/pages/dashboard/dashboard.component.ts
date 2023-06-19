import { Component, inject, OnInit } from '@angular/core';
import { WINDOW } from "../../shared/window.token";
import { IUserStorageData } from "../../utils/interfaces";
import { StorageDataService } from "../../shared/storage-data.service";

@Component({
  selector: 'id-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public localStorageService = inject(StorageDataService)
  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData ? this.window.navigator.userAgentData.mobile : this.window.navigator.userAgent.includes('Mobile')

  private userDataFromStorage!: IUserStorageData
  public userWidgets: {showWeatherWidget: boolean, showGmailList: boolean, showCalendarList: boolean} = {
    showWeatherWidget: false,
    showGmailList: false,
    showCalendarList: false
  }

  ngOnInit() {
    this.localStorageService.getUserDataAsObservable()
      .subscribe((userData: IUserStorageData | undefined) => {
        if (userData) {
          this.userDataFromStorage = userData
          this.userWidgets = {
            showWeatherWidget: userData.showWeatherWidget,
            showGmailList: userData.showGmailList,
            showCalendarList: userData.showCalendarList
          }
        }
      })
  }

}
