import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { StorageDataService } from "../../shared/storage-data.service";
import { WINDOW } from "../../shared/window.token";

@Component({
  selector: 'id-user-settings',
  standalone: true,
  imports: [CommonModule, MatDialogModule, NgOptimizedImage],
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {

  private dialogRef: MatDialogRef<{dialogTitle: string}> = inject(MatDialogRef<UserSettingsComponent>)
  private data: {dialogTitle: string} = inject(MAT_DIALOG_DATA)

  private storageService = inject(StorageDataService)

  public window: any = inject(WINDOW)
  public isMobile: boolean = this.window.navigator.userAgentData.mobile

  public dialogTitle = this.data.dialogTitle

  closeDialog() {
    this.dialogRef.close(false)
  }
}
