import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  backgroundImages,
  DIALOG_QUESTION_ANIMATION_ENTER,
  DIALOG_QUESTION_ANIMATION_EXIT, DIALOG_QUESTION_CLASS,
  primaryBG
} from "./utils/internal-data";
import { IBackground, ITodo, IUserStorageData } from "./utils/interfaces";
import { StorageDataService } from "./shared/storage-data.service";
import { WINDOW } from "./shared/window.token";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { TimeKeeperService } from "./shared/time-keeper.service";
import { MatDialog } from "@angular/material/dialog";
import { WelcomeDialogComponent } from "./pages/welcome-stepper/welcome-dialog.component";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(.7)' }),
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
    ])
  ]
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
  matDialog = inject(MatDialog)
  public route = inject(Router)
  triggerData: ITodo | undefined

  public isMobile: boolean = false

  constructor(@Inject(WINDOW) private window: any) {
    console.log('Window: ', this.window.navigator.userAgentData.mobile)
    this.isMobile = this.window.navigator.userAgentData.mobile
  }

  ngOnInit() {
    if (this.isMobile) return
    this.userDataFromStorage = this.localStorageService.getUserDataFromStorage()
    this.bgPhoto = this.userDataFromStorage.userBackground
    if (this.userDataFromStorage.showWelcomeMsg) {
      this.matDialog.open(WelcomeDialogComponent, {
        width: '60vw',
        height: '60vh',
        enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
        exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
        panelClass: DIALOG_QUESTION_CLASS,
        disableClose: false,
        data: {
          dialogTitle: 'Welcome to iDash!',
          showWelcomeMsg: this.userDataFromStorage.showWelcomeMsg
        }
      })
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated && outlet.activatedRoute.snapshot.url;
  }
}
