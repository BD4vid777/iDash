import { Component, Inject, inject, OnInit } from '@angular/core';
import { backgroundImages, primaryBG } from "./utils/internal-data";
import { IBackground, IUserStorageData } from "./utils/interfaces";
import { StorageDataService } from "./shared/storage-data.service";
import { WINDOW } from "./shared/window.token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'iDash';

  private userDataFromStorage!: IUserStorageData

  private bgPrimary: IBackground = primaryBG
  public bgPhoto: IBackground = primaryBG
  public bgArray: IBackground[] = backgroundImages

  public fullscreen: boolean = false

  public localStorageService = inject(StorageDataService)

  constructor(@Inject(WINDOW) private window: Window) {
    // console.log('Window: ', this.window)
  }

  ngOnInit() {
    this.userDataFromStorage = this.localStorageService.getUserDataFromStorage()
    this.bgPhoto = this.userDataFromStorage.userBackground
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
