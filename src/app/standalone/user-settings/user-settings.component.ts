import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { StorageDataService } from "../../shared/storage-data.service";
import { WINDOW } from "../../shared/window.token";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IUserStorageData } from "../../utils/interfaces";
import { GoogleSignInService } from "../../shared/google-sign-in.service";
import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: 'id-user-settings',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NgOptimizedImage, ReactiveFormsModule, GoogleSigninButtonModule, MatDividerModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {

  private dialogRef: MatDialogRef<{dialogTitle: string, showWelcomeMsg: boolean, showGmailList: boolean}> = inject(MatDialogRef<UserSettingsComponent>)
  private data: {
    dialogTitle: string,
    showWelcomeMsg: boolean,
    showGmailList: boolean
  } = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  private storageService = inject(StorageDataService)
  private loginService = inject(GoogleSignInService)

  public user: SocialUser | null = null

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile

  public dialogTitle = this.data.dialogTitle

  public loggedInUser = false

  public settingsForm!: FormGroup<{
    showWelcomeMsg: FormControl<boolean>,
    showGmailList: FormControl<boolean>
  }>

  constructor() {
    this.settingsForm = this.fb.nonNullable.group({
      showWelcomeMsg: this.fb.nonNullable.control(this.data.showWelcomeMsg),
      showGmailList: this.fb.nonNullable.control({value: this.data.showGmailList, disabled: !this.loggedInUser})
    })

    this.loginService.getUser().pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user
      this.loggedInUser = user != null
      this.loggedInUser ? this.settingsForm.controls.showGmailList.enable() : this.settingsForm.controls.showGmailList.disable()
    })
  }

  changeWelcomeMsgStatus() {
    let userData: IUserStorageData = this.storageService.getUserData()
    userData.showWelcomeMsg = !userData.showWelcomeMsg
    this.storageService.setUserData(userData)
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

  logOut() {
    this.loginService.logOut()
  }

  toggleShowGMail() {
    //TODO: Implement this feature
  }
}
