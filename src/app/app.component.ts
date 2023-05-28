import { Component, Inject, inject, OnInit } from '@angular/core';
import { backgroundImages, primaryBG } from "./utils/internal-data";
import { IBackground, ITodo, IUserStorageData } from "./utils/interfaces";
import { StorageDataService } from "./shared/storage-data.service";
import { WINDOW } from "./shared/window.token";
import { NavigationEnd, Router } from "@angular/router";
import { TimeKeeperService } from "./shared/time-keeper.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'iDash';
  public isDashboard: boolean = false;

  private userDataFromStorage!: IUserStorageData

  private bgPrimary: IBackground = primaryBG
  public bgPhoto: IBackground = primaryBG
  public bgArray: IBackground[] = backgroundImages

  public fullscreen: boolean = false

  public localStorageService = inject(StorageDataService)
  public timeKeeperService = inject(TimeKeeperService)
  public route = inject(Router)
  triggerData: ITodo | undefined

  constructor(@Inject(WINDOW) private window: Window) {
    // console.log('Window: ', this.window)
  }

  ngOnInit() {
    this.userDataFromStorage = this.localStorageService.getUserDataFromStorage()
    this.bgPhoto = this.userDataFromStorage.userBackground
    if (this.userDataFromStorage.showWelcomeMsg) {

    }

    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDashboard = event.urlAfterRedirects == '/dashboard';
      }
    })

    this.timeKeeperService.getTimeKeeper().subscribe((data) => {
      this.triggerData = data
    })
  }

  changeBackground(photoLink: string, photoAuthor: string, photoIndex: number) {
    this.bgPhoto = {
      photoLink: photoLink,
      photoAuthor: photoAuthor,
      photoIndex: photoIndex
    }

    const storageData = this.localStorageService.getUserDataFromStorage()
    storageData.userBackground = this.bgPhoto

    this.localStorageService.setUserData(storageData)
  }

  resetBackground() {
    this.changeBackground(this.bgPrimary.photoLink, this.bgPrimary.photoAuthor, this.bgPrimary.photoIndex)
  }

  fullscreenToggle() {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {this.fullscreen = false})
    } else {
      document.documentElement.requestFullscreen().then(() => {this.fullscreen = true})
    }
  }
}
