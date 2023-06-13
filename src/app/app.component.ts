import { Component, inject, OnInit } from '@angular/core';
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
import { DashGameComponent } from "./standalone/dash-game/dash-game.component";
import { UserSettingsComponent } from "./standalone/user-settings/user-settings.component";
import { GoogleSignInService } from "./shared/google-sign-in.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SocialUser } from "@abacritt/angularx-social-login";

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

  private loginService = inject(GoogleSignInService)

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
  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile

  public user: SocialUser | null = null
  public loggedInUser = false

  triggerData: ITodo | undefined

  constructor() {
    this.loginService.getUser().pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user
      this.loggedInUser = user != null
    })

    this.route.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDashboard = event.urlAfterRedirects == '/dashboard';
      }
    })

    this.timeKeeperService.getTimeKeeper().pipe(takeUntilDestroyed()).subscribe((data) => {
      this.triggerData = data
    })
  }

  ngOnInit() {
    //console.log("Mobile: ", this.window.navigator.userAgentData.mobile)
    //if (this.isMobile) return
    this.userDataFromStorage = this.localStorageService.getUserDataFromStorage()
    this.bgPhoto = this.userDataFromStorage.userBackground
    if (this.userDataFromStorage.showWelcomeMsg) {
      this.matDialog.open(WelcomeDialogComponent, {
        width: this.isMobile ? '95vw' : '60vw',
        height: this.isMobile ? '80vh' : '60vh',
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
  }

  changeBackground(photoLink: string, photoLinkMobile: string, photoAuthor: string, photoIndex: number) {
    this.bgPhoto = {
      photoLink: photoLink,
      photoLinkMobile: photoLinkMobile,
      photoAuthor: photoAuthor,
      photoIndex: photoIndex
    }

    const storageData = this.localStorageService.getUserDataFromStorage()
    storageData.userBackground = this.bgPhoto

    this.localStorageService.setUserData(storageData)
  }

  resetBackground() {
    this.changeBackground(this.bgPrimary.photoLink, this.bgPrimary.photoLinkMobile,this.bgPrimary.photoAuthor, this.bgPrimary.photoIndex)
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

  openGame() {
    this.matDialog.open(DashGameComponent, {
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      disableClose: false,
      data: {
        dialogTitle: 'Welcome to iDash 2048!'
      }
    })
  }

  openUserSettings() {
    this.matDialog.open(UserSettingsComponent, {
      width: this.isMobile ? '95vw' : '60vh',
      height: this.isMobile ? '80vh' : '60vh',
      enterAnimationDuration: DIALOG_QUESTION_ANIMATION_ENTER,
      exitAnimationDuration: DIALOG_QUESTION_ANIMATION_EXIT,
      panelClass: DIALOG_QUESTION_CLASS,
      disableClose: false,
      data: {
        dialogTitle: 'User Settings',
        showWelcomeMsg: this.userDataFromStorage.showWelcomeMsg
      }
    })
  }
}
