import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { StorageDataService } from "../../shared/storage-data.service";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { WINDOW } from "../../shared/window.token";

@Component({
  selector: 'id-welcome-stepper',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatTabsModule, MatIconModule, MatDividerModule, NgOptimizedImage],
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss']
})
export class WelcomeDialogComponent {

  private dialogRef: MatDialogRef<{dialogTitle: string, showWelcomeMsg: boolean}> = inject(MatDialogRef<WelcomeDialogComponent>)
  private data: {dialogTitle: string, showWelcomeMsg: boolean} = inject(MAT_DIALOG_DATA)
  private fb: FormBuilder = inject(FormBuilder)

  public window: any = inject(WINDOW)
  public isMobile: boolean = !!this.window.navigator.userAgentData.mobile

  private storageService = inject(StorageDataService)

  public msgForm: FormGroup<{showWelcomeMsg: FormControl<boolean>}> = this.fb.nonNullable.group(
    {showWelcomeMsg: this.fb.nonNullable.control(this.data.showWelcomeMsg)})

  public dialogTitle = this.data.dialogTitle

  changeWelcomeMsgStatus() {
    let userData = this.storageService.getUserData()
    userData.showWelcomeMsg = !userData.showWelcomeMsg
    this.storageService.setUserData(userData)
  }

  closeDialog() {
    this.dialogRef.close(false)
  }
}
