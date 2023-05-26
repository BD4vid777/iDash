import { Component, HostListener, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { backgroundImages, primaryBG } from "./utils/internal-data";
import { IBackground, ITodo, IUserStorageData } from "./utils/interfaces";
import { StorageDataService } from "./shared/storage-data.service";
import { WINDOW } from "./shared/window.token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'iDash';

  private userDataFromStorage!: IUserStorageData

  private bgPrimary: IBackground = primaryBG
  public bgPhoto: IBackground = primaryBG
  public bgArray: IBackground[] = backgroundImages

  public fullscreen: boolean = false

  public localStorageService = inject(StorageDataService)
  triggerData: ITodo | undefined

  constructor(@Inject(WINDOW) private window: Window) {
    // console.log('Window: ', this.window)
  }

  ngOnInit() {
    this.userDataFromStorage = this.localStorageService.getUserDataFromStorage()
    this.bgPhoto = this.userDataFromStorage.userBackground
    if (this.userDataFromStorage.showWelcomeMsg) {

    }
    // Do usuniecia jak bedzie service
    this.triggerData = {
      boardUid: "",
      columnIndex: 0,
      columnUid: "",
      completed: false,
      content: "",
      createdAt: new Date(),
      dueDate: '',
      editedAt: new Date(),
      priority: 'Low',
      progress: 0,
      uid: '123',
      title: 'Test'
    }
  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    await localStorage.setItem('appClosed', 'works')
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

  triggerKeeper(trigger: 'play' | 'pause' | 'stop', time: number, uid: string) {
    console.log('Trigger: ', trigger, time, uid)
  }
}
