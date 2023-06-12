import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { StorageDataService } from "../../shared/storage-data.service";
import { WINDOW } from "../../shared/window.token";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IUserStorageData } from "../../utils/interfaces";

@Component({
  selector: 'id-user-settings',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  private dialogRef: MatDialogRef<{dialogTitle: string, showWelcomeMsg: boolean}> = inject(MatDialogRef<UserSettingsComponent>)
  private data: {dialogTitle: string, showWelcomeMsg: boolean} = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  private storageService = inject(StorageDataService)

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile

  public dialogTitle = this.data.dialogTitle

  public loggedInUser = false

  public settingsForm!: FormGroup<{
    showWelcomeMsg: FormControl<boolean>
  }>

  ngOnInit() {
    this.settingsForm = this.fb.nonNullable.group({
      showWelcomeMsg: this.fb.nonNullable.control(this.data.showWelcomeMsg)
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
}
